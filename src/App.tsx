import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Welcome from "./pages/onboarding/Welcome";
import FitnessAssessment from "./pages/onboarding/FitnessAssessment";
import BodyMetrics from "./pages/onboarding/BodyMetrics";
import Preferences from "./pages/onboarding/Preferences";
import Personal from "./pages/profile/Personal";
import AppSettings from "./pages/settings/AppSettings";
import ConnectedDevices from "./pages/settings/ConnectedDevices";
import Photos from "./pages/progress/Photos";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/fitness-assessment" element={<FitnessAssessment />} />
          <Route path="/onboarding/body-metrics" element={<BodyMetrics />} />
          <Route path="/onboarding/preferences" element={<Preferences />} />
          
          {/* Profile & Settings Routes */}
          <Route path="/profile/personal" element={<Personal />} />
          <Route path="/settings/app" element={<AppSettings />} />
          <Route path="/settings/connected-devices" element={<ConnectedDevices />} />
          
          {/* Progress Routes */}
          <Route path="/progress/photos" element={<Photos />} />
          
          {/* Main App Routes - Placeholders for Phase 3+ */}
          <Route path="/workout" element={<Placeholder title="Workout" description="Workout planning and tracking coming soon!" />} />
          <Route path="/progress" element={<Placeholder title="Progress" description="Progress tracking and analytics coming soon!" />} />
          <Route path="/health" element={<Placeholder title="Health" description="Health monitoring and safety features coming soon!" />} />
          <Route path="/profile" element={<Placeholder title="Profile" description="Profile management coming soon!" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
