
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FABProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({ onClick }) => {
  return (
    <Button 
      className="fixed bottom-24 right-5 rounded-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90 w-14 h-14 p-0 shadow-lg" 
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
