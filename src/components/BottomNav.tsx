
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, ShoppingCart, ChefHat, User } from 'lucide-react';
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
      to: '/lists',
      icon: List,
      label: 'Lists',
      active: location.pathname === '/lists'
    },
    {
      to: '/shopping',
      icon: ShoppingCart,
      label: 'Shopping',
      active: location.pathname === '/shopping'
    },
    {
      to: isChef ? '/chef-dashboard' : '/chef-marketplace',
      icon: ChefHat,
      label: isChef ? 'Chef' : 'Chefs',
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
    <nav className="fixed bottom-0 left-0 right-0 bg-uber-white border-t border-uber-gray-100 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 animate-press ${
              item.active
                ? 'text-uber-black bg-uber-gray-50'
                : 'text-uber-gray-500 hover:text-uber-black hover:bg-uber-gray-50'
            }`}
          >
            <item.icon className={`h-6 w-6 mb-1 ${item.active ? 'text-uber-black' : 'text-uber-gray-500'}`} />
            <span className={`text-uber-xs font-medium ${item.active ? 'text-uber-black' : 'text-uber-gray-500'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
