
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { UserDashboardLayout } from "./components/UserDashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { Reports } from "./pages/Reports";
import { Predictions } from "./pages/Predictions";
import { UserPredictions } from "./pages/UserPredictions";
import { Learn } from "./pages/Learn";
import { Profile } from "./pages/Profile";
import { UserProfile } from "./pages/UserProfile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Farmer Routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/reports" element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          } />
          <Route path="/predictions" element={
            <DashboardLayout>
              <Predictions />
            </DashboardLayout>
          } />
          <Route path="/learn" element={
            <DashboardLayout>
              <Learn />
            </DashboardLayout>
          } />
          <Route path="/profile" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />

          {/* User Routes */}
          <Route path="/user-dashboard" element={
            <UserDashboardLayout>
              <UserDashboard />
            </UserDashboardLayout>
          } />
          <Route path="/user-predictions" element={
            <UserDashboardLayout>
              <UserPredictions />
            </UserDashboardLayout>
          } />
          <Route path="/user-profile" element={
            <UserDashboardLayout>
              <UserProfile />
            </UserDashboardLayout>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
