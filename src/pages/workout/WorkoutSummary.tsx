import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Zap, Target, Share2, Star } from "lucide-react";

const WorkoutSummary = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const summaryData = {
    duration: 47,
    calories: 325,
    exercisesCompleted: 8,
    personalRecords: ["Bench Press: 185 lbs"],
    avgHeartRate: 142
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-muted-foreground">Great job on finishing your workout</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Session Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-muted">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{summaryData.duration}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted">
              <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{summaryData.calories}</div>
              <div className="text-sm text-muted-foreground">Calories</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{summaryData.exercisesCompleted}</div>
              <div className="text-sm text-muted-foreground">Exercises</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-muted">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{summaryData.personalRecords.length}</div>
              <div className="text-sm text-muted-foreground">New PRs</div>
            </div>
          </div>

          {summaryData.personalRecords.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Personal Records 🎉</h3>
              <ul className="space-y-2">
                {summaryData.personalRecords.map((pr, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    {pr}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Recovery Recommendations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Drink 16-20 oz of water within the next hour</li>
              <li>• Consume protein within 30 minutes</li>
              <li>• Rest for at least 24 hours before training chest again</li>
              <li>• Light stretching recommended in 2-3 hours</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => navigate("/dashboard")} className="flex-1">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default WorkoutSummary;
