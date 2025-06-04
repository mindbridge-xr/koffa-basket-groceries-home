
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meal-prep': return 'bg-green-100 text-green-800';
      case 'cooking-class': return 'bg-blue-100 text-blue-800';
      case 'consultation': return 'bg-purple-100 text-purple-800';
      case 'private-chef': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="card-familyhub-hover cursor-pointer animate-press"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">{getCategoryIcon(service.category)}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-base text-foreground mb-1 font-poppins">
              {service.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-inter">
              {service.description}
            </p>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span className="text-xs font-inter">{service.duration} min</span>
              </div>
              
              {service.maxGuests && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  <span className="text-xs font-inter">Up to {service.maxGuests}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`text-xs capitalize border-0 ${getCategoryColor(service.category)}`}
              >
                {service.category.replace('-', ' ')}
              </Badge>
              
              <div className="flex items-center text-primary font-bold font-poppins">
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
