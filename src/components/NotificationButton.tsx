
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useActivity } from '@/context/ActivityContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItem {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
  icon: string;
  itemType: 'notification' | 'activity';
  actionUrl?: string;
}

export const NotificationButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { activities, notifications, unreadCount, markActivityAsRead, markNotificationAsRead, markAllAsRead } = useActivity();
  const navigate = useNavigate();

  const handleActivityClick = (activity: any) => {
    markActivityAsRead(activity.id);
    setOpen(false);
  };

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setOpen(false);
  };

  // Transform data to consistent format
  const allItems: NotificationItem[] = [
    ...notifications.map(n => ({ 
      id: n.id,
      title: n.title,
      content: n.message,
      timestamp: n.timestamp,
      read: n.read,
      icon: '🔔',
      itemType: 'notification' as const,
      actionUrl: n.actionUrl
    })),
    ...activities.map(a => ({ 
      id: a.id,
      title: a.title,
      content: a.description,
      timestamp: a.timestamp,
      read: a.read,
      icon: a.icon,
      itemType: 'activity' as const
    }))
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const handleItemClick = (item: NotificationItem) => {
    if (item.itemType === 'notification') {
      handleNotificationClick(item);
    } else {
      handleActivityClick(item);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg font-poppins">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          {allItems.length > 0 ? (
            <div className="p-2">
              {allItems.map((item, index) => (
                <div key={`${item.itemType}-${item.id}`}>
                  <button
                    className={`w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors ${
                      !item.read ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium font-poppins ${!item.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.title}
                          </h4>
                          {!item.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-inter">
                          {item.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 font-inter">
                          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </button>
                  {index < allItems.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-inter">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
