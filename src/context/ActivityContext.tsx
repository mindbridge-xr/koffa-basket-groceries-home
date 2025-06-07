
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Activity {
  id: string;
  type: 'task_completed' | 'list_created' | 'chef_booked' | 'item_added' | 'shopping_completed';
  title: string;
  description: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
  icon: string;
  read: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface ActivityContextType {
  activities: Activity[];
  notifications: Notification[];
  unreadCount: number;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp' | 'read'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markActivityAsRead: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearOldActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'task_completed',
      title: 'Task Completed',
      description: 'Sarah completed "Buy groceries"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userName: 'Sarah',
      icon: '✅',
      read: false
    },
    {
      id: '2',
      type: 'chef_booked',
      title: 'Chef Booking',
      description: 'Chef booking confirmed for Saturday',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: '👨‍🍳',
      read: false
    },
    {
      id: '3',
      type: 'list_created',
      title: 'New List',
      description: 'Mike added "Dinner party prep" to tasks',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userName: 'Mike',
      icon: '📝',
      read: true
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Shopping Reminder',
      message: 'You have 5 items pending in your grocery list',
      type: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: '/shopping'
    },
    {
      id: '2',
      title: 'Task Due Soon',
      message: 'Clean kitchen is due in 2 hours',
      type: 'warning',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: false,
      actionUrl: '/tasks'
    },
    {
      id: '3',
      title: 'Chef Available',
      message: 'Your favorite chef Marco has new availability',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/chef-marketplace'
    }
  ]);

  const unreadCount = activities.filter(a => !a.read).length + notifications.filter(n => !n.read).length;

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp' | 'read'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markActivityAsRead = (id: string) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setActivities(prev => prev.map(a => ({ ...a, read: true })));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearOldActivities = () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    setActivities(prev => prev.filter(a => a.timestamp > oneWeekAgo));
    setNotifications(prev => prev.filter(n => n.timestamp > oneWeekAgo));
  };

  // Clear old activities weekly
  useEffect(() => {
    const timer = setInterval(clearOldActivities, 24 * 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ActivityContext.Provider value={{
      activities,
      notifications,
      unreadCount,
      addActivity,
      addNotification,
      markActivityAsRead,
      markNotificationAsRead,
      markAllAsRead,
      clearOldActivities
    }}>
      {children}
    </ActivityContext.Provider>
  );
};
