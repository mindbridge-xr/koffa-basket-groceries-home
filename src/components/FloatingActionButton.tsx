
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FABProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const FloatingActionButton: React.FC<FABProps> = ({ 
  onClick, 
  className,
  icon = <Plus className="h-6 w-6" />,
  label
}) => {
  if (label) {
    return (
      <button 
        className={cn(
          "fixed bottom-24 right-4 bg-uber-black text-uber-white rounded-full shadow-uber-lg px-6 py-3 flex items-center space-x-2 font-medium animate-press hover:shadow-uber-lg hover:bg-uber-gray-800 transition-all duration-300",
          className
        )} 
        onClick={onClick}
      >
        {icon}
        <span className="text-uber-sm">{label}</span>
      </button>
    );
  }
  
  return (
    <button 
      className={cn(
        "fixed bottom-24 right-4 w-14 h-14 bg-uber-black text-uber-white rounded-full shadow-uber-lg flex items-center justify-center animate-press hover:shadow-uber-lg hover:bg-uber-gray-800 transition-all duration-300",
        className
      )} 
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
