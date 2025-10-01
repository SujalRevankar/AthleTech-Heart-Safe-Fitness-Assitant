import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dumbbell, Zap, Target, Bike } from "lucide-react";

const muscleGroups = [
  { name: "Chest", icon: Target },
  { name: "Back", icon: Target },
  { name: "Shoulders", icon: Target },
  { name: "Arms", icon: Zap },
  { name: "Legs", icon: Bike },
  { name: "Core", icon: Target }
];

const equipment = [
  "Dumbbells",
  "Barbell",
  "Resistance Bands",
  "Pull-up Bar",
  "Bench",
  "No Equipment"
];

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [duration, setDuration] = useState([30]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    workout: true,
    rest: true,
    achievements: true
  });

  const handleMuscleToggle = (muscle: string) => {
    setSelectedMuscles(prev =>
      prev.includes(muscle) ? prev.filter(m => m !== muscle) : [...prev, muscle]
    );
  };

  const handleEquipmentToggle = (equip: string) => {
    setSelectedEquipment(prev =>
      prev.includes(equip) ? prev.filter(e => e !== equip) : [...prev, equip]
    );
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Your Preferences</h1>
            <span className="text-sm text-muted-foreground">Step 4 of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Preferred Muscle Groups</Label>
          <div className="grid grid-cols-2 gap-3">
            {muscleGroups.map(({ name, icon: Icon }) => (
              <Card
                key={name}
                className={`p-4 cursor-pointer hover:border-primary transition-colors ${
                  selectedMuscles.includes(name) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleMuscleToggle(name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedMuscles.includes(name) ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      selectedMuscles.includes(name) ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <Label className="cursor-pointer font-medium">{name}</Label>
                  </div>
                  <Checkbox checked={selectedMuscles.includes(name)} />
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Workout Duration</Label>
          <div className="px-2">
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={15}
              max={120}
              step={15}
              className="mb-4"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">{duration[0]} minutes</span>
              <p className="text-sm text-muted-foreground mt-1">Typical workout duration</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Available Equipment</Label>
          <div className="grid grid-cols-2 gap-3">
            {equipment.map((equip) => (
              <Card
                key={equip}
                className={`p-3 cursor-pointer hover:border-primary ${
                  selectedEquipment.includes(equip) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleEquipmentToggle(equip)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox checked={selectedEquipment.includes(equip)} />
                  <Label className="cursor-pointer text-sm">{equip}</Label>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Notification Preferences</Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Workout Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about scheduled workouts</p>
              </div>
              <Switch
                checked={notifications.workout}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, workout: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Rest Day Alerts</Label>
                <p className="text-sm text-muted-foreground">Reminders for recovery days</p>
              </div>
              <Switch
                checked={notifications.rest}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, rest: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Achievements</Label>
                <p className="text-sm text-muted-foreground">Celebrate your milestones</p>
              </div>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, achievements: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Button
          onClick={handleFinish}
          className="w-full"
          disabled={selectedMuscles.length === 0 || selectedEquipment.length === 0}
        >
          Finish Setup
        </Button>
      </div>
    </div>
  );
};

export default Preferences;
