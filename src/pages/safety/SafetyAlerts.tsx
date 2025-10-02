import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High Workout Frequency",
    message: "You've worked out 6 days in a row. Consider taking a rest day to prevent overtraining.",
    timestamp: "2 hours ago",
    severity: "medium"
  },
  {
    id: 2,
    type: "info",
    title: "Form Check Reminder",
    message: "During your last bench press session, remember to keep your shoulder blades retracted.",
    timestamp: "1 day ago",
    severity: "low"
  },
  {
    id: 3,
    type: "critical",
    title: "Weight Increase Too Rapid",
    message: "You increased deadlift weight by 15% in one session. Recommended increase is 5-10%.",
    timestamp: "3 days ago",
    severity: "high"
  }
];

const SafetyAlerts = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-accent" />;
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "destructive" as const,
      medium: "default" as const,
      low: "secondary" as const
    };
    return <Badge variant={variants[severity as keyof typeof variants]}>{severity}</Badge>;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Safety Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage your workout safety notifications</p>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have 1 high-priority alert that requires your attention.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Alerts</h2>
          {alerts.map(alert => (
            <Card key={alert.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{alert.title}</h3>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-muted-foreground mb-3">{alert.message}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {alert.timestamp}
                    </div>
                    <Button size="sm" variant="outline">Acknowledge</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Safety Settings</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Weight Progression Limits</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Maximum allowed weight increase per session
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm">Current: 10%</span>
                <Button size="sm" variant="outline">Adjust</Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rest Day Reminders</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Get notified when you need recovery time
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm">After 5 consecutive workout days</span>
                <Button size="sm" variant="outline">Adjust</Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Heart Rate Alerts</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Alert when exceeding safe heart rate zones
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm">Enabled (Max: 180 bpm)</span>
                <Button size="sm" variant="outline">Adjust</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Injury Prevention Tips</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Always warm up before lifting heavy</div>
                <p className="text-sm text-muted-foreground">5-10 minutes of light cardio and dynamic stretching</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Focus on proper form over heavy weight</div>
                <p className="text-sm text-muted-foreground">Quality repetitions prevent injuries and build strength effectively</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Listen to your body</div>
                <p className="text-sm text-muted-foreground">Pain is different from muscle fatigue - stop if something doesn't feel right</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <div className="font-medium">Include rest days in your routine</div>
                <p className="text-sm text-muted-foreground">Muscles grow during recovery, not during workouts</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default SafetyAlerts;
