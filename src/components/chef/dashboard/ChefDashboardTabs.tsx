
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Activity, Calendar, BarChart3, MessageSquare } from 'lucide-react';

interface ChefDashboardTabsProps {
  activeTab: 'overview' | 'bookings' | 'analytics' | 'messages';
  onTabChange: (tab: 'overview' | 'bookings' | 'analytics' | 'messages') => void;
}

export const ChefDashboardTabs: React.FC<ChefDashboardTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const isMobile = useIsMobile();
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity, shortLabel: 'Overview' },
    { id: 'bookings', label: 'Bookings', icon: Calendar, shortLabel: 'Bookings' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, shortLabel: 'Stats' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, shortLabel: 'Chat' }
  ] as const;

  return (
    <div className="flex overflow-x-auto bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-white/20 shadow-sm">
      <div className="flex space-x-1 sm:space-x-2 min-w-full">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            className={`flex-1 min-w-0 font-inter touch-target px-2 sm:px-3 ${
              activeTab === tab.id 
                ? 'btn-primary shadow-sm' 
                : 'hover:bg-white/50 text-muted-foreground'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon className="h-4 w-4 flex-shrink-0" />
            <span className={`ml-1 truncate ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile ? tab.shortLabel : tab.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
