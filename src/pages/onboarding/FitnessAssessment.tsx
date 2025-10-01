import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FitnessAssessment = () => {
  const navigate = useNavigate();
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [goals, setGoals] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState([3]);
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);

  const fitnessGoals = ["Strength", "Weight Loss", "Endurance", "General Fitness"];
  const conditions = ["Heart Condition", "Joint Issues", "Back Problems", "None"];

  const handleGoalToggle = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleConditionToggle = (condition: string) => {
    if (condition === "None") {
      setMedicalConditions(["None"]);
    } else {
      setMedicalConditions(prev => {
        const filtered = prev.filter(c => c !== "None");
        return prev.includes(condition)
          ? filtered.filter(c => c !== condition)
          : [...filtered, condition];
      });
    }
  };

  const handleContinue = () => {
    navigate("/onboarding/body-metrics");
  };

  const activityLabels = ["Sedentary", "Light", "Moderate", "Active", "Very Active"];
  const showMedicalWarning = medicalConditions.some(c => c !== "None");

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Fitness Assessment</h1>
            <span className="text-sm text-muted-foreground">Step 2 of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
          </div>
        </div>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Experience Level</Label>
          <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
            <div className="space-y-3">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <Card key={level} className="p-4 cursor-pointer hover:border-primary">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={level} id={level} />
                    <Label htmlFor={level} className="cursor-pointer flex-1">
                      <div className="font-medium">{level}</div>
                      <div className="text-sm text-muted-foreground">
                        {level === "Beginner" && "New to working out"}
                        {level === "Intermediate" && "Regular training experience"}
                        {level === "Advanced" && "Extensive training background"}
                      </div>
                    </Label>
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Fitness Goals</Label>
          <div className="grid grid-cols-2 gap-3">
            {fitnessGoals.map((goal) => (
              <Card
                key={goal}
                className={`p-4 cursor-pointer hover:border-primary ${
                  goals.includes(goal) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleGoalToggle(goal)}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox checked={goals.includes(goal)} />
                  <Label className="cursor-pointer">{goal}</Label>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Current Activity Level</Label>
          <div className="px-2">
            <Slider
              value={activityLevel}
              onValueChange={setActivityLevel}
              max={4}
              step={1}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              {activityLabels.map((label, index) => (
                <span
                  key={label}
                  className={activityLevel[0] === index ? "text-primary font-medium" : ""}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <Label className="text-lg font-semibold mb-4 block">Medical Conditions</Label>
          <div className="space-y-3">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  checked={medicalConditions.includes(condition)}
                  onCheckedChange={() => handleConditionToggle(condition)}
                />
                <Label className="cursor-pointer" onClick={() => handleConditionToggle(condition)}>
                  {condition}
                </Label>
              </div>
            ))}
          </div>
          {showMedicalWarning && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please consult with a healthcare provider before starting any new exercise program.
              </AlertDescription>
            </Alert>
          )}
        </Card>

        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={!experienceLevel || goals.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FitnessAssessment;
