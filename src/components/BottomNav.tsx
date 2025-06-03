
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
    <nav className="fixed bottom-0 left-0 right-0 bg-uber-white border-t border-uber-gray-100 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 min-w-[60px] animate-press",
                isActive
                  ? "bg-uber-black text-uber-white"
                  : "text-uber-gray-500 hover:text-uber-black hover:bg-uber-gray-50"
              )}
            >
              <item.icon 
                size={22} 
                className={cn(
                  "transition-all duration-200",
                  isActive ? "fill-current" : ""
                )} 
              />
              <span className={cn(
                "text-xs mt-1 font-medium transition-all duration-200",
                isActive ? "text-uber-white" : "text-uber-gray-500"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
