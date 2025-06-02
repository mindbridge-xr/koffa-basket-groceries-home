
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ScrollText, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: 'Shopping',
      path: '/shopping',
      icon: ShoppingBag,
      disabled: true, // This would be a future feature
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
        item.disabled ? (
          <div
            key={item.path}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors text-muted-foreground/50 cursor-not-allowed"
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.name}</span>
          </div>
        ) : (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors relative",
              location.pathname === item.path
                ? "text-koffa-aqua-forest bg-koffa-aqua-forest/10"
                : "text-muted-foreground hover:text-koffa-aqua-forest hover:bg-koffa-aqua-forest/5"
            )}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.name}</span>
            {location.pathname === item.path && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-koffa-aqua-forest rounded-full" />
            )}
          </Link>
        )
      ))}
    </nav>
  );
};
