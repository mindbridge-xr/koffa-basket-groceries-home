
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Star } from 'lucide-react';

export const RecentActivityCard: React.FC = () => {
  const activities = [
    { 
      type: 'booking', 
      message: 'New booking request received', 
      time: '2 hours ago', 
      color: 'bg-green-500' 
    },
    { 
      type: 'payment', 
      message: 'Payment received for cooking class', 
      time: '1 day ago', 
      color: 'bg-blue-500' 
    },
    { 
      type: 'review', 
      message: 'New 5-star review from Sarah', 
      time: '2 days ago', 
      color: 'bg-yellow-500' 
    }
  ];

  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
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
  );
};
