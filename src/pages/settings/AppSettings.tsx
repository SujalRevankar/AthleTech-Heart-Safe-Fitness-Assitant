import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Moon, Sun, Bell, Globe, Database, Shield, Trash2 } from "lucide-react";

const AppSettings = () => {
  const [theme, setTheme] = useState("system");
  const [units, setUnits] = useState("metric");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    achievements: true
  });

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">App Settings</h1>

        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            </div>
            <div className="flex-1">
              <Label className="text-lg font-semibold">Appearance</Label>
              <p className="text-sm text-muted-foreground">Customize how the app looks</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-lg font-semibold">Notifications</Label>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about workouts and progress</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive weekly progress reports</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Achievement Alerts</Label>
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

        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-lg font-semibold">Regional Settings</Label>
              <p className="text-sm text-muted-foreground">Customize units and language</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="units">Unit System</Label>
              <Select value={units} onValueChange={setUnits}>
                <SelectTrigger id="units" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <Label className="text-lg font-semibold">Data & Privacy</Label>
              <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-destructive">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <Label className="text-lg font-semibold text-destructive">Danger Zone</Label>
              <p className="text-sm text-muted-foreground">Irreversible actions</p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    </Layout>
  );
};

export default AppSettings;
