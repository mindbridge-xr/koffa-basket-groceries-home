
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Timer, 
  MapPin, 
  Zap, 
  TrendingUp,
  Heart,
  Target
} from 'lucide-react';
import { HealthMetrics } from '@/types/smartShopping';
import { cn } from '@/lib/utils';

interface HealthTrackingDashboardProps {
  metrics: HealthMetrics;
  isTracking: boolean;
  weeklyStats?: {
    totalSessions: number;
    totalSteps: number;
    totalCalories: number;
    averageEfficiency: number;
  };
}

export const HealthTrackingDashboard: React.FC<HealthTrackingDashboardProps> = ({
  metrics,
  isTracking,
  weeklyStats
}) => {
  const stepGoal = 2000; // Daily step goal
  const stepProgress = Math.min((metrics.steps / stepGoal) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Current Session Metrics */}
      <Card className={cn(
        "border-2 transition-colors",
        isTracking ? "border-green-400 bg-green-50" : "border-gray-200"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              {isTracking ? "Shopping in Progress" : "Shopping Session"}
            </CardTitle>
            {isTracking && (
              <Badge className="bg-green-600 text-white animate-pulse">
                Live Tracking
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metrics.steps}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <Activity className="w-4 h-4 mr-1" />
                Steps
              </div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-red-600">{metrics.caloriesBurned}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center">
                <Zap className="w-4 h-4 mr-1" />
                Calories
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step Goal Progress</span>
              <span>{metrics.steps}/{stepGoal}</span>
            </div>
            <Progress value={stepProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{metrics.distanceWalked}m walked</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-gray-500" />
              <span>{metrics.shoppingDuration} min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      {weeklyStats && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{weeklyStats.totalSessions}</div>
                <div className="text-sm text-gray-600">Shopping Trips</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{weeklyStats.totalSteps.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Steps</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">{weeklyStats.totalCalories}</div>
                <div className="text-sm text-gray-600">Calories Burned</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{weeklyStats.averageEfficiency}%</div>
                <div className="text-sm text-gray-600">Avg Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
