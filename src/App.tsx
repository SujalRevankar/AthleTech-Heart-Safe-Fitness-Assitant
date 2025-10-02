import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import WorkoutPlan from "./pages/workout/WorkoutPlan";
import ActiveWorkout from "./pages/workout/ActiveWorkout";
import WorkoutSummary from "./pages/workout/WorkoutSummary";
import ProgressOverview from "./pages/progress/ProgressOverview";
import Analytics from "./pages/progress/Analytics";
import HealthDashboard from "./pages/health/HealthDashboard";
import HeartHealth from "./pages/health/HeartHealth";
import SafetyAlerts from "./pages/safety/SafetyAlerts";
import Subscription from "./pages/premium/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          <Route path="/onboarding/fitness-assessment" element={<ProtectedRoute><FitnessAssessment /></ProtectedRoute>} />
          <Route path="/onboarding/body-metrics" element={<ProtectedRoute><BodyMetrics /></ProtectedRoute>} />
          <Route path="/onboarding/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
          
          {/* Profile & Settings Routes */}
          <Route path="/profile/personal" element={<ProtectedRoute><Personal /></ProtectedRoute>} />
          <Route path="/settings/app" element={<ProtectedRoute><AppSettings /></ProtectedRoute>} />
          <Route path="/settings/connected-devices" element={<ProtectedRoute><ConnectedDevices /></ProtectedRoute>} />
          
          {/* Workout Routes */}
          <Route path="/workout/plan" element={<ProtectedRoute><WorkoutPlan /></ProtectedRoute>} />
          <Route path="/workout/active/:workoutId" element={<ProtectedRoute><ActiveWorkout /></ProtectedRoute>} />
          <Route path="/workout/summary/:sessionId" element={<ProtectedRoute><WorkoutSummary /></ProtectedRoute>} />
          
          {/* Progress Routes */}
          <Route path="/progress/overview" element={<ProtectedRoute><ProgressOverview /></ProtectedRoute>} />
          <Route path="/progress/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/progress/photos" element={<ProtectedRoute><Photos /></ProtectedRoute>} />
          
          {/* Health & Safety Routes */}
          <Route path="/health/dashboard" element={<ProtectedRoute><HealthDashboard /></ProtectedRoute>} />
          <Route path="/health/heart-health" element={<ProtectedRoute><HeartHealth /></ProtectedRoute>} />
          <Route path="/safety/alerts" element={<ProtectedRoute><SafetyAlerts /></ProtectedRoute>} />
          
          {/* Premium Routes */}
          <Route path="/premium/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
