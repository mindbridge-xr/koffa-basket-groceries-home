
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
      <Button 
        className={cn(
          "fixed bottom-24 right-5 rounded-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90 shadow-lg px-6",
          className
        )} 
        onClick={onClick}
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    );
  }
  
  return (
    <Button 
      className={cn(
        "fixed bottom-24 right-5 rounded-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90 w-14 h-14 p-0 shadow-lg",
        "hover:scale-105 transition-transform duration-200",
        className
      )} 
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
