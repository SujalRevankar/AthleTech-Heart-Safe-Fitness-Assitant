import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export const TopHeader = () => {
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
              <Link to="/settings" className="text-foreground hover:text-primary transition-colors">
                App Settings
              </Link>
              <Link to="/help" className="text-foreground hover:text-primary transition-colors">
                Help & Support
              </Link>
              <Link to="/premium" className="text-foreground hover:text-primary transition-colors">
                Premium Features
              </Link>
              <Link to="/share" className="text-foreground hover:text-primary transition-colors">
                Share App
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About AthleTech
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="ml-4 text-lg font-bold text-primary">AthleTech</h1>
      </div>
    </header>
  );
};
