
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { useTasks } from '@/context/TaskContext';
import { useChef } from '@/context/ChefContext';
import { 
  CheckCircle, 
  ListTodo, 
  Share2, 
  ShoppingCart, 
  TrendingUp,
  Star,
  DollarSign
} from 'lucide-react';

export const ProfileStats: React.FC = () => {
  const { getUserStats } = useApp();
  const { getTaskStats } = useTasks();
  const { isChef, chefProfile, earnings } = useChef();
  
  const userStats = getUserStats();
  const taskStats = getTaskStats();

  const stats = [
    {
      label: 'Lists Created',
      value: userStats.totalLists,
      icon: ListTodo,
      color: 'text-blue-600'
    },
    {
      label: 'Items Added',
      value: userStats.totalItems,
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      label: 'Tasks Completed',
      value: taskStats.completed,
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      label: 'Shared Lists',
      value: userStats.sharedLists,
      icon: Share2,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Profile Completion */}
      <Card className="card-familyhub">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground font-poppins">
              Profile Completion
            </span>
            <span className="text-sm text-muted-foreground font-inter">
              {userStats.profileCompletion}%
            </span>
          </div>
          <Progress value={userStats.profileCompletion} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="card-familyhub">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground font-poppins mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-inter">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chef Stats (if applicable) */}
      {isChef && earnings && (
        <Card className="card-familyhub">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 font-poppins flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Chef Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary font-poppins">
                  ${earnings.totalEarnings}
                </div>
                <div className="text-xs text-muted-foreground font-inter">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary font-poppins flex items-center justify-center">
                  {earnings.avgRating} <Star className="h-3 w-3 ml-1 text-yellow-400 fill-current" />
                </div>
                <div className="text-xs text-muted-foreground font-inter">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      <Card className="card-familyhub">
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3 font-poppins">Recent Achievements</h3>
          <div className="space-y-2">
            {userStats.achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground font-poppins">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-muted-foreground font-inter">
                    {achievement.description}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {achievement.category}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
