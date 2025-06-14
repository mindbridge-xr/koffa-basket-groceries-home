
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Edit, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/PageHeader';
import { BottomNav } from '@/components/BottomNav';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { QuickActions } from '@/components/profile/QuickActions';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { useApp } from '@/context/AppContext';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <PageHeader 
          title="Edit Profile"
          showBack
          onBack={handleEditToggle}
        />
        
        <div className="mobile-spacing py-4">
          <ProfileForm onSuccess={handleEditSuccess} />
        </div>
        
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <PageHeader 
        title="Profile"
        showBack
        onBack={() => navigate('/')}
      >
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={handleEditToggle}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>
      
      <div className="mobile-spacing py-4 space-y-6">
        <ProfileHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-2xl p-1">
            <TabsTrigger value="overview" className="font-inter">Overview</TabsTrigger>
            <TabsTrigger value="stats" className="font-inter">Stats</TabsTrigger>
            <TabsTrigger value="actions" className="font-inter">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 gap-4">
              <ProfileStats />
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 mt-6">
            <ProfileStats />
          </TabsContent>

          <TabsContent value="actions" className="space-y-4 mt-6">
            <QuickActions />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
