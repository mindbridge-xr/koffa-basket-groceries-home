
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { KoffaLogo } from '@/components/KoffaLogo';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, Bell, HelpCircle, Shield, LogOut, Edit, Plus, Mail, Phone } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, familyMembers } = useApp();
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [inviteEmail, setInviteEmail] = useState('');
  
  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    console.log('Updating profile:', { name: editName });
    setShowEditDialog(false);
  };

  const handleInviteMember = () => {
    // TODO: Implement family invitation
    console.log('Inviting member:', inviteEmail);
    setInviteEmail('');
    setShowInviteDialog(false);
  };

  const profileStats = [
    { label: 'Lists Created', value: '12' },
    { label: 'Items Added', value: '89' },
    { label: 'Family Members', value: familyMembers.length.toString() }
  ];

  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => console.log('Settings') },
    { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
    { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy') },
    { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
  ];

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <KoffaLogo className="text-white" size="sm" />
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
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-white/80">Manage your account and preferences</p>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-2xl">{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <div className="flex items-center text-gray-600 mb-1">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              {profileStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-koffa-aqua-forest">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Family Circle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Family Circle
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInviteDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {familyMembers.length > 0 ? (
              <div className="space-y-3">
                {familyMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
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
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium mb-2">No family members yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Invite family members to share lists and shop together
                </p>
                <Button
                  className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  onClick={() => setShowInviteDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Family Member
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-4 border-b last:border-b-0"
                onClick={item.action}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full text-destructive hover:bg-destructive/10 border-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
      
      <BottomNav />

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                value={user?.email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Family Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Family Member</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="invite-email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter their email address"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              They'll receive an invitation to join your family circle and share grocery lists.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleInviteMember}
              disabled={!inviteEmail.includes('@')}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
