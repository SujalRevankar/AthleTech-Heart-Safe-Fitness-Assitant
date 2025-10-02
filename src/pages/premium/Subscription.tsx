import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Basic workout tracking",
      "AI workout generation (limited)",
      "Progress photos",
      "Basic analytics",
      "Community access"
    ],
    current: true
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    popular: true,
    features: [
      "Unlimited AI workout generation",
      "Advanced analytics & insights",
      "Heart rate monitoring",
      "Personalized nutrition advice",
      "Priority support",
      "Custom workout templates",
      "Export all data"
    ]
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    features: [
      "Everything in Premium",
      "1-on-1 trainer consultations",
      "Video form analysis",
      "Meal planning",
      "Advanced injury prevention AI",
      "API access",
      "White-label option"
    ]
  }
];

const Subscription = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upgrade Your Training</h1>
          <p className="text-muted-foreground">Choose the plan that fits your fitness journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card 
              key={plan.name} 
              className={`p-6 relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                {plan.name === "Pro" && <Crown className="h-8 w-8 mx-auto mb-2 text-accent" />}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                {plan.current && (
                  <Badge variant="secondary" className="mt-2">Current Plan</Badge>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full"
                variant={plan.current ? "outline" : plan.popular ? "default" : "secondary"}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Premium Features Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Premium</th>
                  <th className="text-center py-3 px-4">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "AI Workouts/Month", free: "5", premium: "Unlimited", pro: "Unlimited" },
                  { name: "Progress Photos", free: "✓", premium: "✓", pro: "✓" },
                  { name: "Advanced Analytics", free: "✗", premium: "✓", pro: "✓" },
                  { name: "Nutrition Advice", free: "✗", premium: "✓", pro: "✓" },
                  { name: "Trainer Consultations", free: "✗", premium: "✗", pro: "✓" },
                  { name: "Video Analysis", free: "✗", premium: "✗", pro: "✓" }
                ].map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{row.name}</td>
                    <td className="text-center py-3 px-4">{row.free}</td>
                    <td className="text-center py-3 px-4">{row.premium}</td>
                    <td className="text-center py-3 px-4">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Sparkles className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Start Your Free 14-Day Trial</h3>
              <p className="text-muted-foreground mb-4">
                Try Premium features risk-free. No credit card required. Cancel anytime.
              </p>
              <Button>Start Free Trial</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Subscription;
