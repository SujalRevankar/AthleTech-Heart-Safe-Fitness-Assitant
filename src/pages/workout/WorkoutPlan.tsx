import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Zap, Clock, Target, Play } from "lucide-react";

const workoutCategories = ["Strength", "Cardio", "Flexibility"];

const muscleGroups = [
  "All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core"
];

const sampleWorkouts = [
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
  const [selectedCategory, setSelectedCategory] = useState("Strength");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

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
                  <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
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
