
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import { ChefProvider } from "@/context/ChefContext";

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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? element : <Navigate to="/auth" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/lists" element={<ProtectedRoute element={<Lists />} />} />
      <Route path="/shopping" element={<ProtectedRoute element={<Shopping />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/list/:listId" element={<ProtectedRoute element={<ListDetail />} />} />
      <Route path="/category/:slug" element={<ProtectedRoute element={<CategoryItems />} />} />
      
      {/* Chef Marketplace Routes */}
      <Route path="/chef-marketplace" element={<ProtectedRoute element={<ChefMarketplace />} />} />
      <Route path="/chef-onboarding" element={<ProtectedRoute element={<ChefOnboarding />} />} />
      <Route path="/chef-dashboard" element={<ProtectedRoute element={<ChefDashboard />} />} />
      
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
