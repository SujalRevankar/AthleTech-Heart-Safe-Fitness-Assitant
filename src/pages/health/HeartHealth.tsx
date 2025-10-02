import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Heart, Activity, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const heartRateData = [
  { time: "Week 1", resting: 68, avg: 135, max: 172 },
  { time: "Week 2", resting: 66, avg: 132, max: 168 },
  { time: "Week 3", resting: 64, avg: 130, max: 165 },
  { time: "Week 4", resting: 62, avg: 128, max: 162 }
];

const HeartHealth = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Heart Health</h1>
          <p className="text-muted-foreground">Cardiovascular fitness tracking</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">62</div>
                <div className="text-sm text-muted-foreground">Resting HR</div>
              </div>
            </div>
            <div className="text-xs text-secondary flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              -6 bpm from last month
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-8 w-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold">128</div>
                <div className="text-sm text-muted-foreground">Avg Workout HR</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Optimal zone</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">162</div>
                <div className="text-sm text-muted-foreground">Max HR</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Peak performance</div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Heart Rate Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="resting" stroke="hsl(var(--primary))" strokeWidth={2} name="Resting" />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--secondary))" strokeWidth={2} name="Avg Workout" />
              <Line type="monotone" dataKey="max" stroke="hsl(var(--accent))" strokeWidth={2} name="Max" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Heart Rate Zones</h2>
          <div className="space-y-4">
            {[
              { zone: "Zone 1: Recovery", range: "60-70% (108-126 bpm)", color: "bg-blue-500", width: "20%" },
              { zone: "Zone 2: Endurance", range: "70-80% (126-144 bpm)", color: "bg-green-500", width: "35%" },
              { zone: "Zone 3: Tempo", range: "80-90% (144-162 bpm)", color: "bg-yellow-500", width: "30%" },
              { zone: "Zone 4: Threshold", range: "90-95% (162-171 bpm)", color: "bg-orange-500", width: "10%" },
              { zone: "Zone 5: Maximum", range: "95-100% (171-180 bpm)", color: "bg-red-500", width: "5%" }
            ].map(zone => (
              <div key={zone.zone}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{zone.zone}</span>
                  <span className="text-muted-foreground">{zone.range}</span>
                </div>
                <div className="w-full h-6 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${zone.color} flex items-center justify-end pr-2`}
                    style={{ width: zone.width }}
                  >
                    <span className="text-xs text-white font-medium">{zone.width}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cardiovascular Fitness Score</h2>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-5xl font-bold text-primary">85</div>
            <div className="flex-1">
              <div className="text-lg font-semibold mb-1">Excellent</div>
              <p className="text-sm text-muted-foreground">Your heart health is in great shape. Continue with your current training routine.</p>
            </div>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "85%" }} />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Maintain consistent cardio training</div>
                <p className="text-sm text-muted-foreground">Your improvements show consistency is working</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Include 2-3 HIIT sessions per week</div>
                <p className="text-sm text-muted-foreground">High-intensity intervals will further improve cardiovascular capacity</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Monitor recovery between sessions</div>
                <p className="text-sm text-muted-foreground">Ensure adequate rest for optimal heart health</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default HeartHealth;
