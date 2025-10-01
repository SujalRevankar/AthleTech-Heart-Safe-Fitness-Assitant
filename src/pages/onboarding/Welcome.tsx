import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell, Heart, TrendingUp, Shield } from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Personalized Workouts",
    description: "AI-powered routines tailored to your goals and experience level"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Real-time monitoring and alerts to prevent injuries"
  },
  {
    icon: Heart,
    title: "Health Insights",
    description: "Track your cardiovascular fitness and recovery"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Visualize your fitness journey with comprehensive analytics"
  }
];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < benefits.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/onboarding/fitness-assessment");
    }
  };

  const handleSkip = () => {
    navigate("/onboarding/fitness-assessment");
  };

  const CurrentIcon = benefits[currentSlide].icon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">AthleTech</h1>
          <p className="text-muted-foreground">Your Personal Fitness Companion</p>
        </div>

        <Card className="p-8 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CurrentIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{benefits[currentSlide].title}</h2>
            <p className="text-muted-foreground">{benefits[currentSlide].description}</p>
          </div>
        </Card>

        <div className="flex justify-center gap-2 mb-8">
          {benefits.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip
          </Button>
          <Button onClick={handleNext} className="flex-1">
            {currentSlide < benefits.length - 1 ? "Next" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
