
import React from 'react';
import { Chef } from '@/types/chef';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

interface ChefCardProps {
  chef: Chef;
  onClick: () => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onClick }) => {
  return (
    <Card 
      className="card-uber-hover cursor-pointer animate-press"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={chef.avatar} alt={chef.name} />
            <AvatarFallback className="text-lg">{chef.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-uber-lg text-uber-black truncate">
                {chef.name}
              </h3>
              {chef.isVerified && (
                <CheckCircle className="h-4 w-4 text-uber-green" />
              )}
            </div>
            
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-uber-sm font-medium">{chef.rating}</span>
                <span className="text-uber-xs text-uber-gray-500 ml-1">
                  ({chef.totalBookings} bookings)
                </span>
              </div>
              
              <div className="flex items-center text-uber-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="text-uber-xs">{chef.location}</span>
              </div>
            </div>
            
            <p className="text-uber-sm text-uber-gray-600 mb-3 line-clamp-2">
              {chef.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {chef.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-uber-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-uber-lg font-bold text-uber-green">
                ${chef.hourlyRate}/hr
              </span>
              
              <Badge 
                className={
                  chef.experienceLevel === 'professional' 
                    ? 'bg-uber-green text-white'
                    : chef.experienceLevel === 'culinary-trained'
                    ? 'bg-blue-500 text-white'
                    : 'bg-uber-gray-600 text-white'
                }
              >
                {chef.experienceLevel.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
