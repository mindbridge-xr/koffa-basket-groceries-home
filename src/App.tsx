
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import { ChefProvider } from '@/context/ChefContext';
import { TaskProvider } from '@/context/TaskContext';
import Index from './pages/Index';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Lists from './pages/Lists';
import ListDetail from './pages/ListDetail';
import Shopping from './pages/Shopping';
import CategoryItems from './pages/CategoryItems';
import Profile from './pages/Profile';
import FamilyManagement from './pages/FamilyManagement';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import ChefMarketplace from './pages/ChefMarketplace';
import ChefOnboarding from './pages/ChefOnboarding';
import ChefDashboard from './pages/ChefDashboard';
import ChefProfile from './pages/ChefProfile';
import ChefBooking from './pages/ChefBooking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ChefProvider>
          <TaskProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/lists" element={<Lists />} />
                  <Route path="/list/:listId" element={<ListDetail />} />
                  <Route path="/shopping" element={<Shopping />} />
                  <Route path="/shopping/:category" element={<CategoryItems />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/family-management" element={<FamilyManagement />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/chef-marketplace" element={<ChefMarketplace />} />
                  <Route path="/chef-profile/:chefId" element={<ChefProfile />} />
                  <Route path="/chef-booking/:chefId" element={<ChefBooking />} />
                  <Route path="/chef-onboarding" element={<ChefOnboarding />} />
                  <Route path="/chef-dashboard" element={<ChefDashboard />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </TaskProvider>
        </ChefProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
