import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Lock, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

const Photos = () => {
  const [photos] = useState([
    { id: 1, date: "2025-01-15", tags: ["Front", "Full Body"], url: "" },
    { id: 2, date: "2025-01-01", tags: ["Side", "Full Body"], url: "" },
    { id: 3, date: "2024-12-15", tags: ["Front", "Upper Body"], url: "" }
  ]);

  const [isPrivate, setIsPrivate] = useState(true);

  const handleCapture = () => {
    toast.success("Camera opened - feature in development");
  };

  const handleUpload = () => {
    toast.success("Upload started - feature in development");
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Progress Photos</h1>
          <Badge variant={isPrivate ? "secondary" : "outline"}>
            <Lock className="w-3 h-3 mr-1" />
            {isPrivate ? "Private" : "Public"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button onClick={handleCapture} className="h-24">
            <div className="text-center">
              <Camera className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Take Photo</span>
            </div>
          </Button>
          <Button onClick={handleUpload} variant="outline" className="h-24">
            <div className="text-center">
              <Upload className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Upload</span>
            </div>
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Photos</h2>
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {photo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No photos yet</h3>
              <p className="text-muted-foreground mb-4">
                Start documenting your fitness journey
              </p>
              <Button onClick={handleCapture}>
                <Camera className="w-4 h-4 mr-2" />
                Take Your First Photo
              </Button>
            </Card>
          )}
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Tips for Great Progress Photos</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Take photos at the same time of day for consistency</li>
            <li>• Use the same lighting and location</li>
            <li>• Wear similar clothing to show body changes</li>
            <li>• Take photos from multiple angles (front, side, back)</li>
            <li>• Be patient - visible changes take time</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default Photos;
