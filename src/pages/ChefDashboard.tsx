
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { StatusHeader } from '@/components/chef/dashboard/StatusHeader';
import { InteractiveStats } from '@/components/chef/dashboard/InteractiveStats';
import { ChefDashboardTabs } from '@/components/chef/dashboard/ChefDashboardTabs';
import { OverviewSection } from '@/components/chef/dashboard/OverviewSection';
import { BookingsSection } from '@/components/chef/dashboard/BookingsSection';
import { AnalyticsSection } from '@/components/chef/dashboard/AnalyticsSection';
import { MessagesSection } from '@/components/chef/dashboard/MessagesSection';
import { Button } from '@/components/ui/button';

export const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { chefProfile, earnings, bookings, updateBookingStatus, updateChefProfile } = useChef();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'analytics' | 'messages'>('overview');

  if (!chefProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center pb-20">
        <div className="text-center mobile-spacing max-w-sm mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 font-poppins">Chef Profile Not Found</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 font-inter">Complete your chef profile to start accepting bookings</p>
          <Button 
            className="btn-primary w-full sm:w-auto"
            onClick={() => navigate('/chef-onboarding')}
          >
            Complete Setup
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const handleAcceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'confirmed');
  };

  const handleDeclineBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const handleUpdateService = (serviceId: string, updates: any) => {
    const updatedServices = chefProfile.services.map(service =>
      service.id === serviceId ? { ...service, ...updates } : service
    );
    updateChefProfile({ services: updatedServices });
  };

  const handleToggleService = (serviceId: string, active: boolean) => {
    const updatedServices = chefProfile.services.map(service =>
      service.id === serviceId ? { ...service, active } : service
    );
    updateChefProfile({ services: updatedServices });
  };

  // Mock bookings for demo
  const mockBookings = [
    {
      id: 'booking-1',
      chefId: chefProfile.id,
      clientId: 'client-1',
      serviceId: chefProfile.services[0]?.id,
      date: '2024-12-20',
      time: '7:00 PM',
      duration: 180,
      totalPrice: 300,
      status: 'pending',
      guestCount: 4,
      specialRequests: 'Please prepare vegetarian options for 2 guests',
      dietaryRestrictions: ['vegetarian', 'gluten-free'],
      createdAt: new Date().toISOString()
    },
    ...bookings
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewSection
            chefProfile={chefProfile}
            onUpdateService={handleUpdateService}
            onToggleService={handleToggleService}
          />
        );
      case 'bookings':
        return (
          <BookingsSection
            bookings={mockBookings}
            chefProfile={chefProfile}
            onAcceptBooking={handleAcceptBooking}
            onDeclineBooking={handleDeclineBooking}
          />
        );
      case 'analytics':
        return <AnalyticsSection />;
      case 'messages':
        return <MessagesSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <StatusHeader chefProfile={chefProfile} earnings={earnings} />

      <div className="px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        <InteractiveStats earnings={earnings} chefProfile={chefProfile} />
        
        <ChefDashboardTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefDashboard;
