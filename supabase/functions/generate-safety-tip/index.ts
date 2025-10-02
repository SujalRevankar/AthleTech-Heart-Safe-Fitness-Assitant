import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { exerciseName, userContext } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `As a certified fitness trainer and safety expert, provide a concise safety tip for performing "${exerciseName}".

User context:
- Experience level: ${userContext?.experienceLevel || 'beginner'}
${userContext?.healthConditions ? `- Health conditions: ${userContext.healthConditions.join(', ')}` : ''}
${userContext?.previousInjuries ? `- Previous injuries: ${userContext.previousInjuries}` : ''}

Provide a brief (2-3 sentences) safety tip that is:
1. Specific to this exercise
2. Appropriate for their experience level
3. Addresses any health considerations
4. Focuses on proper form and injury prevention

Return ONLY the safety tip text, no JSON or formatting.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a certified fitness trainer focused on exercise safety. Provide clear, concise safety tips.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to generate safety tip');
    }

    const data = await response.json();
    const safetyTip = data.choices[0].message.content.trim();

    return new Response(
      JSON.stringify({ safetyTip }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in generate-safety-tip:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate safety tip' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
