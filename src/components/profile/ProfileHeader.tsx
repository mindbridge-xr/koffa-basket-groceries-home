
import React, { useRef } from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { useChef } from '@/context/ChefContext';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export const ProfileHeader: React.FC = () => {
  const { user, uploadAvatar } = useApp();
  const { isChef, chefProfile } = useChef();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file);
        toast({
          title: "Avatar updated!",
          description: "Your profile picture has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your avatar. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (!user) return null;

  return (
    <div className="card-familyhub p-6">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-3 w-3" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-foreground font-poppins">{user.name}</h1>
            {isChef && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                👨‍🍳 Chef
              </Badge>
            )}
            {user.familyRole && (
              <Badge variant="outline" className="capitalize">
                {user.familyRole}
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground font-inter mb-3">{user.email}</p>
          
          {user.bio && (
            <p className="text-sm text-foreground font-inter mb-3">{user.bio}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="font-inter">{user.location}</span>
              </div>
            )}
            
            {user.joinedAt && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="font-inter">
                  Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
