
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Calendar, 
  Star, 
  Users,
  TrendingUp,
  Target,
  Award,
  Clock
} from 'lucide-react';

interface InteractiveStatsProps {
  earnings: any;
  chefProfile: any;
}

export const InteractiveStats: React.FC<InteractiveStatsProps> = ({ earnings, chefProfile }) => {
  const [animatedEarnings, setAnimatedEarnings] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedEarnings(earnings?.totalEarnings || 0);
    }, 500);
    return () => clearTimeout(timer);
  }, [earnings]);

  const stats = [
    {
      id: 'earnings',
      label: 'Total Earnings',
      value: `$${animatedEarnings}`,
      change: '+12%',
      positive: true,
      icon: DollarSign,
      color: 'bg-green-500',
      progress: 75,
      target: '$5000'
    },
    {
      id: 'bookings',
      label: 'This Month',
      value: `$${earnings?.thisMonth || 0}`,
      change: '+8%',
      positive: true,
      icon: Calendar,
      color: 'bg-blue-500',
      progress: 60,
      target: '$1200'
    },
    {
      id: 'rating',
      label: 'Avg Rating',
      value: chefProfile?.rating || '5.0',
      change: '+0.2',
      positive: true,
      icon: Star,
      color: 'bg-yellow-500',
      progress: 95,
      target: '5.0'
    },
    {
      id: 'clients',
      label: 'Total Bookings',
      value: earnings?.completedBookings || 0,
      change: '+15%',
      positive: true,
      icon: Users,
      color: 'bg-purple-500',
      progress: 80,
      target: '50'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Period Selector */}
      <div className="flex justify-center space-x-1 bg-gray-50 p-1 rounded-2xl">
        {(['week', 'month', 'year'] as const).map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              selectedPeriod === period 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Card 
            key={stat.id} 
            className="card-familyhub cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${stat.color}/10`}>
                  <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    stat.positive ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground font-poppins">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-inter">
                  {stat.label}
                </div>
                
                {/* Progress towards goal */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Goal: {stat.target}</span>
                    <span className="font-medium">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
