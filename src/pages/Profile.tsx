
import React from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KoffaLogo } from '@/components/KoffaLogo';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, familyMembers } = useApp();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <KoffaLogo className="text-white" size="sm" />
        </div>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Family Circle</h3>
          <div className="bg-white rounded-lg shadow-sm">
            {familyMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              className="w-full bg-transparent text-koffa-heavy-metal hover:bg-muted/20 hover:text-koffa-aqua-forest flex items-center justify-center py-4"
            >
              <span className="mr-1">+</span> Add Family Member
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
          >
            Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
