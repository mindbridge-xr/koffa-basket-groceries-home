
import React, { useState } from 'react';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock, 
  Users,
  Settings,
  Eye,
  Plus
} from 'lucide-react';

export const ChefDashboard: React.FC = () => {
  const { chefProfile, earnings, bookings } = useChef();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'earnings'>('overview');

  if (!chefProfile) {
    return (
      <div className="min-h-screen bg-uber-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-uber-xl font-semibold text-uber-black mb-4">Chef Profile Not Found</h2>
          <Button className="btn-uber-primary">Complete Setup</Button>
        </div>
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

  return (
    <div className="min-h-screen bg-uber-white pb-20">
      <div className="bg-uber-black text-uber-white section-padding">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={chefProfile.avatar} alt={chefProfile.name} />
              <AvatarFallback className="text-xl">{chefProfile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-uber-xl font-bold">{chefProfile.name}</h1>
              <p className="text-uber-sm text-uber-white/80">{chefProfile.experienceLevel.replace('-', ' ')}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-uber-sm">{chefProfile.rating || '5.0'}</span>
                <span className="text-uber-xs text-uber-white/60 ml-2">
                  ({chefProfile.totalBookings} bookings)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-uber-white hover:bg-uber-white/10">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-uber-white hover:bg-uber-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="content-padding space-y-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={index} className="card-uber">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-uber-gray-600" />
                  <Badge 
                    variant="outline" 
                    className={`text-uber-xs ${
                      stat.positive ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-uber-lg font-bold text-uber-black">{stat.value}</div>
                <div className="text-uber-xs text-uber-gray-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-uber-gray-50 p-1 rounded-uber">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'bookings', label: 'Bookings' },
            { id: 'earnings', label: 'Earnings' }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              className={`flex-1 ${
                activeTab === tab.id ? 'btn-uber-primary' : 'hover:bg-uber-white'
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
            <Card className="card-uber">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Services</span>
                  <Button variant="outline" size="sm" className="btn-uber-secondary">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chefProfile.services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-uber-gray-50 rounded-uber">
                    <div>
                      <h4 className="font-medium text-uber-base text-uber-black">{service.name}</h4>
                      <div className="flex items-center space-x-4 text-uber-sm text-uber-gray-600">
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
            <Card className="card-uber">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-uber-gray-100 rounded-uber">
                    <div className="w-2 h-2 bg-uber-green rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-uber-sm text-uber-black">New booking request received</p>
                      <p className="text-uber-xs text-uber-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border border-uber-gray-100 rounded-uber">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-uber-sm text-uber-black">Payment received for cooking class</p>
                      <p className="text-uber-xs text-uber-gray-500">1 day ago</p>
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
              <h3 className="text-uber-lg font-semibold text-uber-black">Upcoming Bookings</h3>
              <Badge variant="outline">{bookings.length} total</Badge>
            </div>
            
            {bookings.length > 0 ? (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <Card key={booking.id} className="card-uber">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-uber-base text-uber-black">
                          {chefProfile.services.find(s => s.id === booking.serviceId)?.name || 'Service'}
                        </h4>
                        <Badge 
                          className={
                            booking.status === 'confirmed' ? 'bg-uber-green text-white' :
                            booking.status === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-uber-gray-600 text-white'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-uber-sm text-uber-gray-600">
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
                          <span>{booking.totalPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="card-uber p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-uber-gray-400" />
                <h3 className="text-uber-lg font-semibold text-uber-black mb-2">No bookings yet</h3>
                <p className="text-uber-sm text-uber-gray-500">Your upcoming bookings will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <Card className="card-uber">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-uber-green" />
                  Earnings Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-uber-2xl font-bold text-uber-green">
                      ${earnings?.totalEarnings || 0}
                    </div>
                    <div className="text-uber-sm text-uber-gray-500">Total Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-uber-2xl font-bold text-uber-green">
                      ${earnings?.pendingPayouts || 0}
                    </div>
                    <div className="text-uber-sm text-uber-gray-500">Pending Payout</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-uber-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-uber-sm text-uber-gray-600">This Month</span>
                    <span className="text-uber-base font-medium">${earnings?.thisMonth || 0}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-uber-sm text-uber-gray-600">This Week</span>
                    <span className="text-uber-base font-medium">${earnings?.thisWeek || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-uber-sm text-uber-gray-600">Top Service</span>
                    <span className="text-uber-base font-medium">{earnings?.topService || 'N/A'}</span>
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
