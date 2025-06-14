
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock } from 'lucide-react';

interface ServiceEditFormProps {
  editValues: any;
  onUpdate: (values: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ServiceEditForm: React.FC<ServiceEditFormProps> = ({ 
  editValues, 
  onUpdate, 
  onSave, 
  onCancel 
}) => {
  return (
    <div className="space-y-3">
      <Input
        value={editValues.name}
        onChange={(e) => onUpdate({...editValues, name: e.target.value})}
        className="font-medium text-sm sm:text-base"
        placeholder="Service name"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={editValues.price}
            onChange={(e) => onUpdate({...editValues, price: parseInt(e.target.value)})}
            className="pl-10 text-sm sm:text-base"
            placeholder="Price"
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            value={editValues.duration}
            onChange={(e) => onUpdate({...editValues, duration: parseInt(e.target.value)})}
            className="pl-10 text-sm sm:text-base"
            placeholder="Duration (min)"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button 
          size="sm" 
          onClick={onSave}
          className="flex-1 bg-green-600 hover:bg-green-700 touch-target"
        >
          Save
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          className="flex-1 touch-target"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
