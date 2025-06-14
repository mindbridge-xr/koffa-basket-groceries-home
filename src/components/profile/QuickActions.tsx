
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { useChef } from '@/context/ChefContext';
import { 
  Plus, 
  ClipboardList, 
  ChefHat, 
  Calendar, 
  Settings,
  Users,
  Bell,
  Share2
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { createList } = useApp();
  const { isChef } = useChef();

  const handleQuickList = () => {
    createList(`Quick List ${new Date().toLocaleDateString()}`);
    navigate('/lists');
  };

  const quickActions = [
    {
      label: 'New List',
      icon: Plus,
      onClick: handleQuickList,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      label: 'Tasks',
      icon: ClipboardList,
      onClick: () => navigate('/tasks'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      label: 'Schedule',
      icon: Calendar,
      onClick: () => navigate('/schedule'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      label: 'Family',
      icon: Users,
      onClick: () => navigate('/family-management'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  if (isChef) {
    quickActions.push({
      label: 'Chef Dashboard',
      icon: ChefHat,
      onClick: () => navigate('/chef-dashboard'),
      color: 'bg-amber-500 hover:bg-amber-600'
    });
  }

  const settingsActions = [
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => navigate('/settings')
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: () => navigate('/settings')
    },
    {
      label: 'Share Profile',
      icon: Share2,
      onClick: () => {
        navigator.share?.({
          title: 'Check out my Koffa profile!',
          text: 'I\'m using Koffa to organize my family\'s meals and tasks.',
          url: window.location.href,
        }).catch(() => {
          navigator.clipboard.writeText(window.location.href);
        });
      }
    }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <Card className="card-familyhub">
        <CardHeader>
          <CardTitle className="text-lg font-poppins">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                className={`${action.color} text-white h-16 flex flex-col items-center justify-center space-y-1`}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs font-inter">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings & More */}
      <Card className="card-familyhub">
        <CardHeader>
          <CardTitle className="text-lg font-poppins">Settings & More</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {settingsActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.onClick}
                className="w-full justify-start h-12"
              >
                <action.icon className="h-4 w-4 mr-3" />
                <span className="font-inter">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
