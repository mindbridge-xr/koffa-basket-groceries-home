
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ScrollText, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Shopping',
      path: '/',
      icon: ShoppingBag,
    },
    {
      name: 'Lists',
      path: '/lists',
      icon: ScrollText,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-background shadow-lg border-t py-3 z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors",
            location.pathname === item.path
              ? "text-koffa-aqua-forest"
              : "text-muted-foreground hover:text-koffa-aqua-forest"
          )}
        >
          <item.icon size={24} />
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};
