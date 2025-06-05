import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/context/AppContext';
import { ChefProvider } from '@/context/ChefContext';
import ChefMarketplace from './pages/ChefMarketplace';
import ChefOnboarding from './pages/ChefOnboarding';
import ChefDashboard from './pages/ChefDashboard';
import ChefProfile from './pages/ChefProfile';
import ChefBooking from './pages/ChefBooking';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AppProvider>
        <ChefProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<ChefMarketplace />} />
                <Route path="/chef-marketplace" element={<ChefMarketplace />} />
                <Route path="/chef-profile/:chefId" element={<ChefProfile />} />
                <Route path="/chef-booking/:chefId" element={<ChefBooking />} />
                <Route path="/chef-onboarding" element={<ChefOnboarding />} />
                <Route path="/chef-dashboard" element={<ChefDashboard />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ChefProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
