import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

const Personal = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "",
    age: "30",
    height: "175",
    weight: "75"
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Personal Profile</h1>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
              <div className="mt-2">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  Profile 75% Complete
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself and your fitness goals..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </Card>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </Layout>
  );
};

export default Personal;
