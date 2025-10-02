import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

export const TopHeader = () => {
  const { signOut, user } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full bg-card border-b border-border">
      <div className="flex h-14 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-primary font-bold text-xl">AthleTech</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/settings/app" className="text-foreground hover:text-primary transition-colors">
                App Settings
              </Link>
              <Link to="/premium/subscription" className="text-foreground hover:text-primary transition-colors">
                Premium Features
              </Link>
              <Link to="/profile/personal" className="text-foreground hover:text-primary transition-colors">
                Profile
              </Link>
              <Link to="/settings/connected-devices" className="text-foreground hover:text-primary transition-colors">
                Connected Devices
              </Link>
              {user && (
                <>
                  <Separator className="my-2" />
                  <Button 
                    variant="ghost" 
                    className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="ml-4 text-lg font-bold text-primary">AthleTech</h1>
      </div>
    </header>
  );
};
