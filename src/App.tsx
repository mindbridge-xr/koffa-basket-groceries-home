
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import Lists from '@/pages/Lists';
import ListDetail from '@/pages/ListDetail';
import Shopping from '@/pages/Shopping';
import Tasks from '@/pages/Tasks';
import TaskDetail from '@/pages/TaskDetail';
import ChefMarketplace from '@/pages/ChefMarketplace';
import ChefDashboard from '@/pages/ChefDashboard';
import ChefOnboarding from '@/pages/ChefOnboarding';
import ChefProfile from '@/pages/ChefProfile';
import FamilyManagement from '@/pages/FamilyManagement';
import Schedule from '@/pages/Schedule';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import { AppProvider } from '@/context/AppContext';
import { TaskProvider } from '@/context/TaskContext';
import { ChefProvider } from '@/context/ChefContext';
import { ActivityProvider } from '@/context/ActivityContext';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ActivityProvider>
          <AppProvider>
            <TaskProvider>
              <ChefProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/lists" element={<Lists />} />
                  <Route path="/list/:id" element={<ListDetail />} />
                  <Route path="/shopping" element={<Shopping />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/task/:id" element={<TaskDetail />} />
                  <Route path="/chef-marketplace" element={<ChefMarketplace />} />
                  <Route path="/chef-dashboard" element={<ChefDashboard />} />
                  <Route path="/chef-onboarding" element={<ChefOnboarding />} />
                  <Route path="/chef/:chefId" element={<ChefProfile />} />
                  <Route path="/family-management" element={<FamilyManagement />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </ChefProvider>
            </TaskProvider>
          </AppProvider>
        </ActivityProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
