
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import { ChefProvider } from "@/context/ChefContext";
import { LandingPage } from "@/components/LandingPage";

import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Lists from "./pages/Lists";
import Shopping from "./pages/Shopping";
import Profile from "./pages/Profile";
import ListDetail from "./pages/ListDetail";
import CategoryItems from "./pages/CategoryItems";
import ChefMarketplace from "./pages/ChefMarketplace";
import ChefOnboarding from "./pages/ChefOnboarding";
import ChefDashboard from "./pages/ChefDashboard";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import FamilyManagement from "./pages/FamilyManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? element : <LandingPage />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={<Dashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/family-management" element={<FamilyManagement />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/shopping" element={<Shopping />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/list/:listId" element={<ListDetail />} />
      <Route path="/category/:slug" element={<CategoryItems />} />
      
      {/* Chef Marketplace Routes */}
      <Route path="/chef-marketplace" element={<ChefMarketplace />} />
      <Route path="/chef-onboarding" element={<ChefOnboarding />} />
      <Route path="/chef-dashboard" element={<ChefDashboard />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <ChefProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ChefProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
