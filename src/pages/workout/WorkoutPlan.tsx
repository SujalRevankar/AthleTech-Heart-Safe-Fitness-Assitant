import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Zap, Clock, Target, Play, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const workoutCategories = ["Strength", "Cardio", "Flexibility"];

const muscleGroups = [
  "All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core"
];

interface Workout {
  id: string;
  name: string;
  category: string;
  duration: number;
  difficulty: string;
  muscleGroups: string[];
  exercises: number;
  calories: number;
  aiGenerated?: boolean;
}

const sampleWorkouts: Workout[] = [
  {
    id: "1",
    name: "Upper Body Strength",
    category: "Strength",
    duration: 45,
    difficulty: "Intermediate",
    muscleGroups: ["Chest", "Back", "Shoulders"],
    exercises: 8,
    calories: 320
  },
  {
    id: "2",
    name: "HIIT Cardio Blast",
    category: "Cardio",
    duration: 30,
    difficulty: "Advanced",
    muscleGroups: ["Full Body"],
    exercises: 6,
    calories: 400
  },
  {
    id: "3",
    name: "Core & Flexibility",
    category: "Flexibility",
    duration: 25,
    difficulty: "Beginner",
    muscleGroups: ["Core"],
    exercises: 10,
    calories: 150
  }
];

const WorkoutPlan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Strength");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState(sampleWorkouts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<any>(null);

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setPreferences(data);
      }
    };

    fetchPreferences();
  }, [user]);

  const handleGenerateAIWorkout = async () => {
    if (!user) {
      toast.error("Please sign in to generate AI workouts");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Fetch user metrics
      const { data: metricsData } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single();

      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-workout', {
        body: {
          preferences: {
            experienceLevel: preferences?.experience_level || 'beginner',
            fitnessGoals: preferences?.fitness_goals || [],
            preferredMuscleGroups: preferences?.preferred_muscle_groups || [],
            availableEquipment: preferences?.available_equipment || [],
            typicalWorkoutDuration: preferences?.typical_workout_duration || 30
          },
          userMetrics: metricsData ? {
            weight: metricsData.weight_kg,
            height: metricsData.height_cm
          } : null
        }
      });

      if (functionError) {
        throw functionError;
      }

      if (functionData?.workout) {
        const aiWorkout: Workout = {
          id: `ai-${Date.now()}`,
          name: functionData.workout.workoutName,
          category: functionData.workout.category,
          duration: functionData.workout.estimatedDuration,
          difficulty: preferences?.experience_level || 'Intermediate',
          muscleGroups: Array.from(new Set(functionData.workout.exercises.flatMap((e: any) => e.muscleGroups))) as string[],
          exercises: functionData.workout.exercises.length,
          calories: functionData.workout.estimatedCalories,
          aiGenerated: true
        };

        setWorkouts([aiWorkout, ...workouts]);
        toast.success("AI workout generated successfully!");
      }
    } catch (error: any) {
      console.error('Error generating AI workout:', error);
      if (error.message?.includes('Rate limit')) {
        toast.error("Too many requests. Please wait a moment and try again.");
      } else if (error.message?.includes('credits')) {
        toast.error("AI service temporarily unavailable. Please try again later.");
      } else {
        toast.error("Failed to generate AI workout. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartWorkout = (workoutId: string) => {
    navigate(`/workout/active/${workoutId}`);
  };

  const filteredWorkouts = sampleWorkouts.filter(workout => {
    if (selectedCategory && workout.category !== selectedCategory) return false;
    if (selectedMuscle !== "All" && !workout.muscleGroups.includes(selectedMuscle)) return false;
    if (selectedDifficulty && workout.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Workout Plans</h1>
          <p className="text-muted-foreground">AI-generated workouts personalized for you</p>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">AI-Powered Workout Generation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get a personalized workout plan based on your fitness goals, experience level, and available equipment.
              </p>
              <Button 
                onClick={handleGenerateAIWorkout}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate AI Workout
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3">
            {workoutCategories.map(cat => (
              <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Muscle Groups</h3>
            <div className="flex flex-wrap gap-2">
              {muscleGroups.map(muscle => (
                <Badge
                  key={muscle}
                  variant={selectedMuscle === muscle ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedMuscle(muscle)}
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Difficulty</h3>
            <div className="flex gap-2">
              {["Beginner", "Intermediate", "Advanced"].map(diff => (
                <Badge
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                >
                  {diff}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredWorkouts.map(workout => (
            <Card key={workout.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{workout.name}</h3>
                    {workout.aiGenerated && (
                      <Badge variant="secondary" className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{workout.difficulty}</Badge>
                    <Badge variant="outline">{workout.category}</Badge>
                  </div>
                </div>
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workout.exercises} exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workout.calories} cal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workout.muscleGroups.join(", ")}</span>
                </div>
              </div>

              <Button 
                onClick={() => handleStartWorkout(workout.id)}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Workout
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutPlan;
