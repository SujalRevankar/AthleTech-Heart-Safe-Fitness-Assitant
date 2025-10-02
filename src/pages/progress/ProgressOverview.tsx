import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Flame, Dumbbell, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weightData = [
  { date: "Jan", weight: 185 },
  { date: "Feb", weight: 183 },
  { date: "Mar", weight: 180 },
  { date: "Apr", weight: 178 },
  { date: "May", weight: 176 }
];

const ProgressOverview = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your fitness journey</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">47</div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">-9 lbs</div>
                <div className="text-xs text-muted-foreground">Weight Lost</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
          <Tabs defaultValue="5months">
            <TabsList>
              <TabsTrigger value="1month">1M</TabsTrigger>
              <TabsTrigger value="3months">3M</TabsTrigger>
              <TabsTrigger value="5months">5M</TabsTrigger>
              <TabsTrigger value="1year">1Y</TabsTrigger>
            </TabsList>
            <TabsContent value="5months" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[170, 190]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Strength Gains by Muscle Group</h2>
          <div className="space-y-4">
            {[
              { name: "Chest", progress: 85 },
              { name: "Back", progress: 72 },
              { name: "Legs", progress: 90 },
              { name: "Shoulders", progress: 65 }
            ].map(muscle => (
              <div key={muscle.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span>{muscle.name}</span>
                  <span className="text-muted-foreground">{muscle.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${muscle.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ProgressOverview;
