
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Edit3, 
  Trash2, 
  DollarSign, 
  Clock, 
  Users,
  TrendingUp
} from 'lucide-react';

interface ServiceCardProps {
  service: any;
  onEdit: (service: any) => void;
  onToggle: (serviceId: string, active: boolean) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onToggle }) => {
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'private-chef': return '👨‍🍳';
      case 'cooking-class': return '📚';
      case 'meal-prep': return '🥘';
      case 'consultation': return '💬';
      default: return '🍽️';
    }
  };

  return (
    <div className="relative group">
      <div className="p-3 sm:p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover:bg-gray-100">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="text-xl sm:text-2xl flex-shrink-0">{getServiceIcon(service.category)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm sm:text-base text-foreground font-poppins flex items-center space-x-2 mb-1">
                <span className="truncate">{service.name}</span>
                <Switch 
                  checked={service.active !== false}
                  onCheckedChange={(checked) => onToggle(service.id, checked)}
                  className="flex-shrink-0"
                />
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-inter line-clamp-2">
                {service.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(service)}
              className="h-8 w-8 p-0 touch-target"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 touch-target"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground font-inter">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-3 w-3" />
              <span className="font-medium text-foreground">${service.price}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{service.duration} min</span>
            </div>
            {service.maxGuests && (
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Max {service.maxGuests}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-wrap gap-1">
            <Badge variant="outline" className="capitalize text-xs px-2 py-1">
              {service.category.replace('-', ' ')}
            </Badge>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Popular</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
