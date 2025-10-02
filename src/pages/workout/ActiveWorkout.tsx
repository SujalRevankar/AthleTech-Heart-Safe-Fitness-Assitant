import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Play, Pause, SkipForward, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const sampleExercises = [
  { name: "Bench Press", sets: 3, reps: 10, restTime: 90, safetyTip: "Keep your back flat on the bench" },
  { name: "Incline Dumbbell Press", sets: 3, reps: 12, restTime: 60, safetyTip: "Control the weight on the way down" },
  { name: "Cable Flyes", sets: 3, reps: 15, restTime: 45, safetyTip: "Don't overextend your shoulders" },
];

const ActiveWorkout = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [completedSets, setCompletedSets] = useState<number[]>([]);

  const exercise = sampleExercises[currentExercise];
  const progress = ((currentExercise * exercise.sets + currentSet - 1) / 
    (sampleExercises.reduce((sum, ex) => sum + ex.sets, 0))) * 100;

  useEffect(() => {
    if (isResting && restTimeLeft > 0) {
      const timer = setTimeout(() => setRestTimeLeft(restTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (restTimeLeft === 0 && isResting) {
      setIsResting(false);
    }
  }, [isResting, restTimeLeft]);

  const handleCompleteSet = () => {
    if (!weight || !reps) {
      return;
    }

    setCompletedSets([...completedSets, currentSet]);

    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestTimeLeft(exercise.restTime);
      setWeight("");
      setReps("");
    } else {
      // Move to next exercise
      if (currentExercise < sampleExercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCurrentSet(1);
        setCompletedSets([]);
        setWeight("");
        setReps("");
      } else {
        // Workout complete
        navigate(`/workout/summary/${workoutId}`);
      }
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Exercise {currentExercise + 1} of {sampleExercises.length}</h1>
            <Button variant="destructive" onClick={() => navigate("/workout/plan")}>
              End Workout
            </Button>
          </div>
          <Progress value={progress} className="mb-4" />
        </div>

        <Card className="p-6">
          <h2 className="text-3xl font-bold mb-4">{exercise.name}</h2>
          
          <div className="mb-6">
            <div className="text-lg mb-2">
              Set {currentSet} of {exercise.sets}
            </div>
            <div className="text-muted-foreground">
              Target: {exercise.reps} reps
            </div>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Safety Tip:</strong> {exercise.safetyTip}
            </AlertDescription>
          </Alert>

          {isResting ? (
            <div className="text-center py-8">
              <div className="text-5xl font-bold mb-4">{restTimeLeft}s</div>
              <p className="text-muted-foreground mb-4">Rest Time Remaining</p>
              <Button onClick={handleSkipRest}>
                <SkipForward className="h-4 w-4 mr-2" />
                Skip Rest
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Weight (lbs)</label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Reps Completed</label>
                  <Input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCompleteSet}
                className="w-full"
                disabled={!weight || !reps}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Set
              </Button>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            {Array.from({ length: exercise.sets }, (_, i) => i + 1).map(set => (
              <div
                key={set}
                className={`flex-1 h-2 rounded ${
                  completedSets.includes(set) 
                    ? "bg-primary" 
                    : set === currentSet 
                    ? "bg-primary/50" 
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ActiveWorkout;
