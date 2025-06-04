
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckCircle, ShoppingCart, ChefHat, User } from 'lucide-react';
import { useChef } from '@/context/ChefContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { isChef } = useChef();
  
  const navItems = [
    {
      to: '/',
      icon: Home,
      label: 'Home',
      active: location.pathname === '/'
    },
    {
      to: '/tasks',
      icon: CheckCircle,
      label: 'Tasks',
      active: location.pathname === '/tasks'
    },
    {
      to: '/shopping',
      icon: ShoppingCart,
      label: 'Grocery',
      active: location.pathname.startsWith('/shopping') || location.pathname.startsWith('/lists')
    },
    {
      to: isChef ? '/chef-dashboard' : '/chef-marketplace',
      icon: ChefHat,
      label: 'Chef',
      active: location.pathname.startsWith('/chef')
    },
    {
      to: '/profile',
      icon: User,
      label: 'Profile',
      active: location.pathname === '/profile'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 h-16">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200 active:scale-95 min-w-0 ${
              item.active
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className={`h-5 w-5 mb-1 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`text-xs font-medium font-inter ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
