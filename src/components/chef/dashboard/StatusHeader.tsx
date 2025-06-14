
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Star, Wifi, WifiOff, Settings, Eye } from 'lucide-react';

interface StatusHeaderProps {
  chefProfile: any;
  earnings: any;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ chefProfile, earnings }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [notificationCount] = useState(3);

  return (
    <div className="bg-gradient-primary text-white px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={chefProfile.avatar} alt={chefProfile.name} />
              <AvatarFallback className="bg-white/10 text-white font-bold">
                {chefProfile.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          </div>
          
          <div>
            <h1 className="text-lg font-bold font-poppins">Welcome back, {chefProfile.name}!</h1>
            <div className="flex items-center space-x-2 text-sm text-white/80">
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
              <span>•</span>
              <span className="capitalize">{chefProfile.experienceLevel.replace('-', ' ')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs p-0 animate-pulse">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Status Controls */}
      <div className="flex items-center justify-between bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={isOnline} 
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-green-500"
            />
            <span className="text-sm font-medium">
              {isOnline ? 'Available for bookings' : 'Unavailable'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="font-medium">{chefProfile.rating}</span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            ${chefProfile.hourlyRate}/hr
          </Badge>
        </div>
      </div>
    </div>
  );
};
