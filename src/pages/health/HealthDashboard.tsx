import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const HealthDashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Dashboard</h1>
          <p className="text-muted-foreground">Monitor your health metrics and safety</p>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold">85/100</div>
              <div className="text-sm text-muted-foreground">Heart Health Score</div>
            </div>
          </div>
          <p className="text-sm mb-4">Your cardiovascular health is excellent. Keep up the great work!</p>
          <Button variant="outline" onClick={() => navigate("/health/heart-health")}>
            View Details
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Safety Reminder:</strong> You're approaching your weekly workout limit. Consider scheduling a rest day.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate("/health/heart-health")}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-secondary" />
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Heart Health</h3>
            <p className="text-sm text-muted-foreground mb-3">Track your cardiovascular fitness and heart rate zones</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="font-semibold">Resting HR:</div>
              <div>62 bpm</div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate("/safety/alerts")}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-accent" />
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety Alerts</h3>
            <p className="text-sm text-muted-foreground mb-3">Review recent safety notifications and injury prevention tips</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="font-semibold">Active Alerts:</div>
              <div>2</div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recovery Status</h2>
          <div className="space-y-4">
            {[
              { muscle: "Chest", status: "Recovered", color: "bg-secondary" },
              { muscle: "Legs", status: "48h rest needed", color: "bg-accent" },
              { muscle: "Back", status: "Recovered", color: "bg-secondary" },
              { muscle: "Shoulders", status: "24h rest needed", color: "bg-primary" }
            ].map(item => (
              <div key={item.muscle} className="flex items-center justify-between">
                <span className="font-medium">{item.muscle}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-muted-foreground">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Health Tips</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Hydration</div>
                <p className="text-sm text-muted-foreground">Drink at least 8 glasses of water daily for optimal performance</p>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Sleep Quality</div>
                <p className="text-sm text-muted-foreground">Aim for 7-9 hours of sleep to maximize recovery</p>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium mb-1">Nutrition</div>
                <p className="text-sm text-muted-foreground">Consume protein within 30 minutes after workouts</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default HealthDashboard;
