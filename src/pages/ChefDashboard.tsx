
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock, 
  Users,
  Eye,
  Plus,
  Edit,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export const ChefDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { chefProfile, earnings, bookings, updateBookingStatus } = useChef();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'earnings'>('overview');

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

  const quickStats = [
    {
      label: 'Total Earnings',
      value: `$${earnings?.totalEarnings || 0}`,
      icon: DollarSign,
      change: '+12%',
      positive: true
    },
    {
      label: 'This Month',
      value: `$${earnings?.thisMonth || 0}`,
      icon: Calendar,
      change: '+8%',
      positive: true
    },
    {
      label: 'Avg Rating',
      value: earnings?.avgRating || '5.0',
      icon: Star,
      change: '+0.2',
      positive: true
    },
    {
      label: 'Bookings',
      value: earnings?.completedBookings || 0,
      icon: Users,
      change: '+15%',
      positive: true
    }
  ];

  const handleModifyBooking = (bookingId: string) => {
    toast({
      title: "Modify Booking",
      description: "Booking modification feature coming soon!",
    });
  };

  const handleRequestRefund = (bookingId: string) => {
    toast({
      title: "Refund Requested",
      description: "Your refund request has been submitted for review.",
    });
  };

  const handleReschedule = (bookingId: string) => {
    toast({
      title: "Reschedule Booking",
      description: "Rescheduling feature coming soon!",
    });
  };

  const canModifyBooking = (booking: any) => {
    const bookingDate = new Date(booking.date);
    const now = new Date();
    const timeDiff = bookingDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff > 48; // Can modify if more than 48 hours away
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Chef Dashboard"
        subtitle={`Welcome back, ${chefProfile.name}`}
        showSettings={true}
      >
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Eye className="h-4 w-4" />
        </Button>
      </PageHeader>

      {/* Chef Profile Summary */}
      <div className="mobile-spacing py-4">
        <Card className="card-familyhub mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={chefProfile.avatar} alt={chefProfile.name} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">
                  {chefProfile.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground font-poppins">{chefProfile.name}</h2>
                <p className="text-sm text-muted-foreground font-inter capitalize">
                  {chefProfile.experienceLevel.replace('-', ' ')}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{chefProfile.rating || '5.0'}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({chefProfile.totalBookings} bookings)
                  </span>
                </div>
              </div>
              <Badge className="bg-primary text-white">
                ${chefProfile.hourlyRate}/hr
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="card-familyhub">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      stat.positive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-lg font-bold text-foreground font-poppins">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-inter">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-gray-50 p-1 rounded-2xl mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'bookings', label: 'Bookings' },
            { id: 'earnings', label: 'Earnings' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              className={`flex-1 font-inter ${
                activeTab === tab.id ? 'btn-primary' : 'hover:bg-white text-muted-foreground'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Services */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-poppins">
                  <span>Your Services</span>
                  <Button variant="outline" size="sm" className="btn-secondary">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chefProfile.services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <div>
                      <h4 className="font-semibold text-base text-foreground font-poppins">{service.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
                        <span>{service.duration} min</span>
                        <span>${service.price}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {service.category.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-2xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-inter">New booking request received</p>
                      <p className="text-xs text-muted-foreground font-inter">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-2xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-inter">Payment received for cooking class</p>
                      <p className="text-xs text-muted-foreground font-inter">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground font-poppins">Your Bookings</h3>
              <Badge variant="outline">{bookings.length} total</Badge>
            </div>
            
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.map(booking => {
                  const canModify = canModifyBooking(booking);
                  return (
                    <Card key={booking.id} className="card-familyhub">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-base text-foreground font-poppins">
                            {chefProfile.services.find(s => s.id === booking.serviceId)?.name || 'Service'}
                          </h4>
                          <Badge 
                            className={
                              booking.status === 'confirmed' ? 'bg-green-500 text-white' :
                              booking.status === 'pending' ? 'bg-yellow-500 text-white' :
                              'bg-gray-500 text-white'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>${booking.totalPrice}</span>
                          </div>
                        </div>

                        {/* Booking Management Actions */}
                        <div className="flex space-x-2 pt-3 border-t border-gray-100">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleModifyBooking(booking.id)}
                            disabled={!canModify}
                            className="flex-1"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Modify
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReschedule(booking.id)}
                            disabled={!canModify}
                            className="flex-1"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Reschedule
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRequestRefund(booking.id)}
                            disabled={!canModify}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Refund
                          </Button>
                        </div>
                        
                        {!canModify && (
                          <p className="text-xs text-muted-foreground mt-2 font-inter">
                            * Modifications available until 48 hours before the booking
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="card-familyhub p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No bookings yet</h3>
                <p className="text-sm text-muted-foreground font-inter">Your bookings will appear here once confirmed.</p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Earnings Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-poppins">
                      ${earnings?.totalEarnings || 0}
                    </div>
                    <div className="text-sm text-muted-foreground font-inter">Total Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary font-poppins">
                      ${earnings?.pendingPayouts || 0}
                    </div>
                    <div className="text-sm text-muted-foreground font-inter">Pending Payout</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-inter">This Month</span>
                    <span className="text-base font-semibold font-poppins">${earnings?.thisMonth || 0}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-inter">This Week</span>
                    <span className="text-base font-semibold font-poppins">${earnings?.thisWeek || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-inter">Top Service</span>
                    <span className="text-base font-semibold font-poppins">{earnings?.topService || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefDashboard;
