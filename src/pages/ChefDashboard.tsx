
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { StatusHeader } from '@/components/chef/dashboard/StatusHeader';
import { InteractiveStats } from '@/components/chef/dashboard/InteractiveStats';
import { SmartBookingCard } from '@/components/chef/dashboard/SmartBookingCard';
import { ServiceManager } from '@/components/chef/dashboard/ServiceManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  TrendingUp,
  Activity,
  BarChart3,
  MessageSquare,
  Star
} from 'lucide-react';

export const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { chefProfile, earnings, bookings, updateBookingStatus, updateChefProfile } = useChef();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'analytics' | 'messages'>('overview');

  if (!chefProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center pb-20">
        <div className="text-center mobile-spacing">
          <h2 className="text-xl font-semibold text-foreground mb-4 font-poppins">Chef Profile Not Found</h2>
          <p className="text-muted-foreground mb-6 font-inter">Complete your chef profile to start accepting bookings</p>
          <Button 
            className="btn-primary"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <StatusHeader chefProfile={chefProfile} earnings={earnings} />

      <div className="mobile-spacing py-4 space-y-6">
        {/* Interactive Stats */}
        <InteractiveStats earnings={earnings} chefProfile={chefProfile} />

        {/* Enhanced Navigation */}
        <div className="flex space-x-2 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-white/20 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'messages', label: 'Messages', icon: MessageSquare }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              className={`flex-1 font-inter ${
                activeTab === tab.id 
                  ? 'btn-primary shadow-sm' 
                  : 'hover:bg-white/50 text-muted-foreground'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <tab.icon className="h-4 w-4 mr-1" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ServiceManager 
              services={chefProfile.services}
              onUpdateService={handleUpdateService}
              onToggleService={handleToggleService}
            />

            {/* Recent Activity */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'booking', message: 'New booking request received', time: '2 hours ago', color: 'bg-green-500' },
                    { type: 'payment', message: 'Payment received for cooking class', time: '1 day ago', color: 'bg-blue-500' },
                    { type: 'review', message: 'New 5-star review from Sarah', time: '2 days ago', color: 'bg-yellow-500' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className={`w-3 h-3 ${activity.color} rounded-full`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-inter">{activity.message}</p>
                        <p className="text-xs text-muted-foreground font-inter">{activity.time}</p>
                      </div>
                      {activity.type === 'review' && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground font-poppins">Smart Bookings</h3>
              <Badge variant="outline" className="bg-white/50">
                {mockBookings.length} total
              </Badge>
            </div>
            
            {mockBookings.length > 0 ? (
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <SmartBookingCard
                    key={booking.id}
                    booking={booking}
                    chefProfile={chefProfile}
                    onAccept={handleAcceptBooking}
                    onDecline={handleDeclineBooking}
                  />
                ))}
              </div>
            ) : (
              <Card className="card-familyhub p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No bookings yet</h3>
                <p className="text-sm text-muted-foreground font-inter">Your smart bookings will appear here once confirmed.</p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <Card className="card-familyhub">
            <CardHeader>
              <CardTitle className="flex items-center font-poppins">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground font-inter">Detailed analytics coming soon!</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'messages' && (
          <Card className="card-familyhub">
            <CardHeader>
              <CardTitle className="flex items-center font-poppins">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">Message Center</h3>
              <p className="text-sm text-muted-foreground font-inter">Customer communication hub coming soon!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefDashboard;
