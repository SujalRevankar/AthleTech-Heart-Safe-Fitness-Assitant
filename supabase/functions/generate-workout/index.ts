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
    const { preferences, userMetrics } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the prompt based on user preferences
    const prompt = `You are an expert fitness trainer creating a personalized workout plan. Generate a detailed workout based on these user details:

Experience Level: ${preferences.experienceLevel || 'beginner'}
Fitness Goals: ${preferences.fitnessGoals?.join(', ') || 'general fitness'}
Preferred Muscle Groups: ${preferences.preferredMuscleGroups?.join(', ') || 'all'}
Available Equipment: ${preferences.availableEquipment?.join(', ') || 'bodyweight only'}
Workout Duration: ${preferences.typicalWorkoutDuration || 30} minutes
${userMetrics?.weight ? `Current Weight: ${userMetrics.weight} kg` : ''}
${userMetrics?.height ? `Height: ${userMetrics.height} cm` : ''}

Create a workout plan with 5-8 exercises that:
1. Matches their experience level and goals
2. Uses only their available equipment
3. Fits within their time constraint
4. Provides proper progression and safety

Return the workout in this JSON format:
{
  "workoutName": "Descriptive workout name",
  "category": "strength" or "cardio" or "flexibility",
  "estimatedDuration": number in minutes,
  "estimatedCalories": estimated calorie burn,
  "exercises": [
    {
      "name": "Exercise name",
      "sets": number,
      "reps": number or "time in seconds",
      "restTime": seconds between sets,
      "muscleGroups": ["muscle1", "muscle2"],
      "equipment": ["equipment1"],
      "instructions": "Brief how-to",
      "safetyTip": "Important safety note"
    }
  ],
  "warmup": "Warmup instructions",
  "cooldown": "Cooldown instructions"
}`;

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
            content: 'You are an expert fitness trainer. Always return valid JSON responses for workout plans. Be specific, safe, and encouraging.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
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
      throw new Error('Failed to generate workout');
    }

    const data = await response.json();
    const workoutText = data.choices[0].message.content;
    
    // Parse the JSON from the response
    let workout;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = workoutText.match(/```json\n([\s\S]*?)\n```/) || 
                       workoutText.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : workoutText;
      workout = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', workoutText);
      throw new Error('Invalid workout format from AI');
    }

    return new Response(
      JSON.stringify({ workout }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in generate-workout:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate workout' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
