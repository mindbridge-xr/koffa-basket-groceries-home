
import React from 'react';
import { ChefService } from '@/types/chef';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: ChefService;
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meal-prep': return '🥗';
      case 'cooking-class': return '👨‍🍳';
      case 'consultation': return '💬';
      case 'private-chef': return '🍽️';
      default: return '🍳';
    }
  };

  return (
    <Card 
      className="card-uber-hover cursor-pointer animate-press"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-uber-gray-50 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{getCategoryIcon(service.category)}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-uber-base text-uber-black mb-1">
              {service.name}
            </h3>
            
            <p className="text-uber-sm text-uber-gray-600 mb-3 line-clamp-2">
              {service.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center text-uber-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span className="text-uber-xs">{service.duration} min</span>
              </div>
              
              {service.maxGuests && (
                <div className="flex items-center text-uber-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  <span className="text-uber-xs">Up to {service.maxGuests}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-uber-xs capitalize">
                {service.category.replace('-', ' ')}
              </Badge>
              
              <div className="flex items-center text-uber-green font-bold">
                <DollarSign className="h-4 w-4" />
                <span>{service.price}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
