import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const BodyMetrics = () => {
  const navigate = useNavigate();
  const [isMetric, setIsMetric] = useState(true);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return null;
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isMetric) {
      return (w / ((h / 100) ** 2)).toFixed(1);
    } else {
      return ((w / (h ** 2)) * 703).toFixed(1);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  const handleContinue = () => {
    navigate("/onboarding/preferences");
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Body Metrics</h1>
            <span className="text-sm text-muted-foreground">Step 3 of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <Label className="text-lg font-semibold">Unit System</Label>
            <div className="flex items-center space-x-2">
              <span className={!isMetric ? "text-muted-foreground" : "font-medium"}>Metric</span>
              <Switch checked={!isMetric} onCheckedChange={() => setIsMetric(!isMetric)} />
              <span className={isMetric ? "text-muted-foreground" : "font-medium"}>Imperial</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="height">Height * ({isMetric ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={isMetric ? "e.g., 175" : "e.g., 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight * ({isMetric ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={isMetric ? "e.g., 70" : "e.g., 154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="mb-3 block">Gender *</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex gap-4">
                  {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {bmi && (
              <Card className="p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">BMI</p>
                    <p className="text-2xl font-bold">{bmi}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${bmiCategory?.color}`}>
                      {bmiCategory?.label}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div>
              <Label htmlFor="targetWeight">Target Weight (Optional) ({isMetric ? "kg" : "lbs"})</Label>
              <Input
                id="targetWeight"
                type="number"
                placeholder="Enter your target weight"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bodyFat">Body Fat Percentage (Optional) %</Label>
              <Input
                id="bodyFat"
                type="number"
                placeholder="e.g., 15"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={!age || !height || !weight || !gender}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BodyMetrics;
