import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Flame, Trophy, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Let's crush your fitness goals today</p>
        </div>

        <Card className="bg-gradient-to-br from-primary to-primary/80">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="space-y-1">
                <p className="text-sm opacity-90">Today's Workout</p>
                <h3 className="text-xl font-bold">Upper Body Strength</h3>
                <p className="text-sm opacity-75">45 minutes • 8 exercises</p>
              </div>
              <Button size="lg" variant="secondary" onClick={() => navigate("/workout/plan")}>
                Start Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,240 cal</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">First Week Complete</p>
                  <p className="text-sm text-muted-foreground">7 day streak achieved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start h-auto py-3" onClick={() => navigate("/workout/plan")}>
              <Dumbbell className="mr-3 h-5 w-5" />
              <div className="text-left">
                <p className="font-medium">Browse Workouts</p>
                <p className="text-sm text-muted-foreground">Find the perfect routine</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
