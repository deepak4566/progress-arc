
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import OnboardingGoals from "./pages/onboarding/OnboardingGoals";
import OnboardingTime from "./pages/onboarding/OnboardingTime";
import OnboardingExperience from "./pages/onboarding/OnboardingExperience";
import CourseDashboard from "./pages/course/CourseDashboard";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<OnboardingGoals />} />
            <Route path="time" element={<OnboardingTime />} />
            <Route path="experience" element={<OnboardingExperience />} />
          </Route>
          <Route path="/course-dashboard" element={<CourseDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
