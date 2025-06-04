
import React from 'react';
import { Chef } from '@/types/chef';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, CheckCircle } from 'lucide-react';

interface ChefCardProps {
  chef: Chef;
  onClick: () => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onClick }) => {
  // Generate placeholder avatar based on chef name
  const getChefAvatar = (name: string) => {
    const colors = ['#FF6B35', '#FF8A62', '#FFB59D', '#E63900', '#BF3100'];
    const colorIndex = name.length % colors.length;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[colorIndex].slice(1)}&color=ffffff&size=128&bold=true`;
  };

  return (
    <Card 
      className="card-familyhub-hover cursor-pointer animate-press"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={chef.avatar || getChefAvatar(chef.name)} 
              alt={chef.name} 
            />
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
              {chef.name[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg text-foreground truncate font-poppins">
                {chef.name}
              </h3>
              {chef.isVerified && (
                <CheckCircle className="h-4 w-4 text-primary" />
              )}
            </div>
            
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium font-inter">{chef.rating}</span>
                <span className="text-xs text-muted-foreground ml-1 font-inter">
                  ({chef.totalBookings} bookings)
                </span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="text-xs font-inter">{chef.location}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-inter">
              {chef.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {chef.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs font-inter">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary font-poppins">
                ${chef.hourlyRate}/hr
              </span>
              
              <Badge 
                className={
                  chef.experienceLevel === 'professional' 
                    ? 'bg-primary text-white'
                    : chef.experienceLevel === 'culinary-trained'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
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
