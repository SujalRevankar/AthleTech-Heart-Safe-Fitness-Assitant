import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const workoutFrequency = [
  { day: "Mon", workouts: 4 },
  { day: "Tue", workouts: 3 },
  { day: "Wed", workouts: 5 },
  { day: "Thu", workouts: 2 },
  { day: "Fri", workouts: 4 },
  { day: "Sat", workouts: 1 },
  { day: "Sun", workouts: 2 }
];

const muscleDistribution = [
  { name: "Chest", value: 25, color: "hsl(var(--primary))" },
  { name: "Back", value: 22, color: "hsl(var(--secondary))" },
  { name: "Legs", value: 28, color: "hsl(var(--accent))" },
  { name: "Arms", value: 15, color: "hsl(var(--chart-1))" },
  { name: "Core", value: 10, color: "hsl(var(--chart-2))" }
];

const Analytics = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed performance insights</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Workout Frequency</h2>
          <Tabs defaultValue="week">
            <TabsList>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
            </TabsList>
            <TabsContent value="week" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutFrequency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Muscle Group Distribution</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={muscleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {muscleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Calorie Burn Trends</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Average</span>
                  <span className="font-semibold">342 cal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Weekly Total</span>
                  <span className="font-semibold">2,394 cal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Total</span>
                  <span className="font-semibold">10,260 cal</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Volume Progression</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Weight Lifted</span>
                  <span className="font-semibold">127,450 lbs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average per Workout</span>
                  <span className="font-semibold">2,712 lbs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth vs Last Month</span>
                  <span className="font-semibold text-secondary">+15%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
