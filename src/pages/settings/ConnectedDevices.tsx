import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Watch, Heart, Activity, Bluetooth, Plus, X } from "lucide-react";
import { toast } from "sonner";

const ConnectedDevices = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "Apple Watch Series 8", type: "smartwatch", connected: true, syncing: true },
    { id: 2, name: "Polar H10 Heart Rate Monitor", type: "heart-rate", connected: true, syncing: false }
  ]);

  const [availableDevices] = useState([
    { id: 3, name: "Fitbit Charge 5", type: "fitness-tracker" },
    { id: 4, name: "Garmin Forerunner", type: "smartwatch" }
  ]);

  const handleDisconnect = (id: number) => {
    setDevices(devices.filter(d => d.id !== id));
    toast.success("Device disconnected");
  };

  const handleConnect = (device: any) => {
    setDevices([...devices, { ...device, connected: true, syncing: false }]);
    toast.success("Device connected successfully");
  };

  const toggleSync = (id: number) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, syncing: !d.syncing } : d
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smartwatch":
        return Watch;
      case "heart-rate":
        return Heart;
      case "fitness-tracker":
        return Activity;
      default:
        return Bluetooth;
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Connected Devices</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Devices</h2>
          {devices.length > 0 ? (
            <div className="space-y-3">
              {devices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                return (
                  <Card key={device.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{device.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {device.connected ? "Connected" : "Disconnected"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">
                          {device.type.replace("-", " ")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDisconnect(device.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto Sync</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically sync workout data
                          </p>
                        </div>
                        <Switch
                          checked={device.syncing}
                          onCheckedChange={() => toggleSync(device.id)}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Bluetooth className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No devices connected</p>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Available Devices</h2>
          <div className="space-y-3">
            {availableDevices.map((device) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <Card key={device.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{device.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {device.type.replace("-", " ")}
                      </p>
                    </div>
                    <Button onClick={() => handleConnect(device)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-6 mt-8 bg-muted/50">
          <h3 className="font-semibold mb-2">Troubleshooting</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Make sure Bluetooth is enabled on your device</li>
            <li>• Keep your device close during pairing</li>
            <li>• Restart the app if connection fails</li>
            <li>• Check device battery level</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
};

export default ConnectedDevices;
