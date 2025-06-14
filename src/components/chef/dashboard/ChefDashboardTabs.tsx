
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Calendar, BarChart3, MessageSquare } from 'lucide-react';

interface ChefDashboardTabsProps {
  activeTab: 'overview' | 'bookings' | 'analytics' | 'messages';
  onTabChange: (tab: 'overview' | 'bookings' | 'analytics' | 'messages') => void;
}

export const ChefDashboardTabs: React.FC<ChefDashboardTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ] as const;

  return (
    <div className="flex space-x-2 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-white/20 shadow-sm">
      {tabs.map(tab => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          className={`flex-1 font-inter ${
            activeTab === tab.id 
              ? 'btn-primary shadow-sm' 
              : 'hover:bg-white/50 text-muted-foreground'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <tab.icon className="h-4 w-4 mr-1" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
