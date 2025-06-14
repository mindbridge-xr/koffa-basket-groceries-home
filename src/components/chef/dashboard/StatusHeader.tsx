
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, Star, Wifi, WifiOff, Settings, Eye } from 'lucide-react';

interface StatusHeaderProps {
  chefProfile: any;
  earnings: any;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ chefProfile, earnings }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [notificationCount] = useState(3);
  const isMobile = useIsMobile();

  return (
    <div className="bg-gradient-primary text-white px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white/20">
              <AvatarImage src={chefProfile.avatar} alt={chefProfile.name} />
              <AvatarFallback className="bg-white/10 text-white font-bold text-sm sm:text-base">
                {chefProfile.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold font-poppins truncate">
              {isMobile ? `Hi, ${chefProfile.name.split(' ')[0]}!` : `Welcome back, ${chefProfile.name}!`}
            </h1>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-white/80">
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
              <span>•</span>
              <span className="capitalize truncate">
                {isMobile ? 'Pro' : chefProfile.experienceLevel.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <div className="relative">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative touch-target p-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center bg-red-500 text-white text-xs p-0 animate-pulse">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 touch-target p-2">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Status Controls - Enhanced for mobile */}
      <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <Switch 
              checked={isOnline} 
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-green-500 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium truncate">
              {isOnline ? 'Available for bookings' : 'Unavailable'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm flex-shrink-0">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{chefProfile.rating}</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 text-xs px-2 py-1">
              ${chefProfile.hourlyRate}/hr
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
