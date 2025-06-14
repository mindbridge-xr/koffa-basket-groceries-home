
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyServicesStateProps {
  onAddService: () => void;
}

export const EmptyServicesState: React.FC<EmptyServicesStateProps> = ({ onAddService }) => {
  return (
    <div className="text-center py-6 sm:py-8 text-muted-foreground">
      <div className="text-3xl sm:text-4xl mb-3">🍽️</div>
      <p className="font-medium mb-2 text-sm sm:text-base">No services yet</p>
      <p className="text-xs sm:text-sm mb-4">Add your first service to start accepting bookings</p>
      <Button 
        onClick={onAddService}
        className="btn-primary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Service
      </Button>
    </div>
  );
};
