
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, Bell, HelpCircle, Shield, LogOut, Edit, Plus, Mail, Phone, Crown } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, familyMembers } = useApp();
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  
  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleSaveProfile = () => {
    console.log('Updating profile:', { name: editName });
    setShowEditDialog(false);
  };

  const profileStats = [
    { label: 'Lists Created', value: '12' },
    { label: 'Items Added', value: '89' },
    { label: 'Family Members', value: familyMembers.length.toString() }
  ];

  const menuItems = [
    { icon: Users, label: 'Family Management', action: () => navigate('/family-management') },
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings') },
    { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
    { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white mobile-padding">
        <div className="flex justify-between items-center mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm font-poppins">F</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setShowEditDialog(true)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-2 font-poppins">My Profile</h1>
        <p className="text-white/80 font-inter">Manage your account and family settings</p>
      </div>
      
      <div className="mobile-spacing space-y-6">
        {/* Profile Card */}
        <div className="card-familyhub p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground font-poppins">{user?.name}</h2>
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center text-muted-foreground mb-1 font-inter">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center text-muted-foreground font-inter">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary font-poppins">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Family Circle Quick View */}
        <div className="card-familyhub p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg text-foreground font-poppins">Family Circle</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/family-management')}
              className="btn-secondary"
            >
              Manage
            </Button>
          </div>
          
          {familyMembers.length > 0 ? (
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {familyMembers.slice(0, 4).map((member, index) => (
                  <Avatar key={index} className="w-10 h-10 border-2 border-white">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary text-white text-sm">
                      {member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {familyMembers.length > 4 && (
                  <div className="w-10 h-10 border-2 border-white bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm text-muted-foreground font-medium">
                      +{familyMembers.length - 4}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-foreground font-poppins">
                  {familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-muted-foreground font-inter">
                  Johnson Family Circle
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4 font-inter">
                No family members yet. Start by inviting your family!
              </p>
              <Button
                onClick={() => navigate('/family-management')}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Invite Family
              </Button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="card-familyhub p-0 overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors text-left"
              onClick={item.action}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground font-inter">{item.label}</span>
              </div>
              <div className="text-muted-foreground">›</div>
            </button>
          ))}
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
      
      <BottomNav />

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground font-inter">
                Full Name
              </label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
                className="input-familyhub"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground font-inter">
                Email
              </label>
              <Input
                id="email"
                value={user?.email}
                disabled
                className="input-familyhub bg-gray-50"
              />
              <p className="text-xs text-muted-foreground font-inter">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowEditDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
              className="btn-primary flex-1"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
