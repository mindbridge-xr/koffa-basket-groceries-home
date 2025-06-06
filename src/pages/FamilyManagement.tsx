
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Mail, Crown, Star, Settings, MoreVertical, UserCheck, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const FamilyManagement: React.FC = () => {
  const { familyMembers, user } = useApp();
  const navigate = useNavigate();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviteName, setInviteName] = useState('');

  const handleInviteMember = () => {
    if (!inviteEmail.trim() || !inviteName.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Name and email are required to send an invitation.",
        variant: "destructive"
      });
      return;
    }

    console.log('Inviting member:', { name: inviteName, email: inviteEmail, role: inviteRole });
    
    toast({
      title: "Invitation sent!",
      description: `An invitation has been sent to ${inviteEmail}`,
    });

    setShowInviteDialog(false);
    setInviteEmail('');
    setInviteName('');
    setInviteRole('member');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'parent':
        return <Star className="h-4 w-4 text-blue-500" />;
      default:
        return <UserCheck className="h-4 w-4 text-green-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-100 text-yellow-800';
      case 'parent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const familyStats = [
    { label: 'Total Members', value: familyMembers.length + 1, icon: Users },
    { label: 'Active Today', value: Math.floor((familyMembers.length + 1) * 0.8), icon: Clock },
    { label: 'Shared Lists', value: '12', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Family Circle"
        subtitle="Manage your family members and permissions"
        showBack={true}
        onBack={() => navigate('/profile')}
      >
        <Button 
          onClick={() => setShowInviteDialog(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-1" />
          Invite
        </Button>
      </PageHeader>

      <div className="mobile-spacing space-y-6">
        {/* Family Stats */}
        <div className="grid grid-cols-3 gap-4">
          {familyStats.map((stat, index) => (
            <div key={index} className="card-familyhub p-4 text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground font-poppins">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-inter">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current User */}
        <Card className="card-familyhub">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-poppins flex items-center">
              <Crown className="h-5 w-5 mr-2 text-primary" />
              Family Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground font-poppins">{user?.name}</h3>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Admin
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-inter">{user?.email}</p>
                  <p className="text-xs text-muted-foreground font-inter">You • Family organizer</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="btn-secondary">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Family Members */}
        <Card className="card-familyhub">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-poppins flex items-center justify-between">
              <span className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Family Members ({familyMembers.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {familyMembers.length > 0 ? (
              familyMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground font-poppins">{member.name}</h4>
                        {getRoleIcon(member.role)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground font-inter">{member.email}</p>
                        <Badge className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">
                  No family members yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4 font-inter">
                  Start building your family circle by inviting members
                </p>
                <Button 
                  onClick={() => setShowInviteDialog(true)}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Invite First Member
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Family Settings */}
        <Card className="card-familyhub">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-poppins">Family Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium text-foreground font-poppins">Family Preferences</h4>
                  <p className="text-sm text-muted-foreground font-inter">Manage family-wide settings</p>
                </div>
              </div>
              <div className="text-muted-foreground">›</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium text-foreground font-poppins">Notifications</h4>
                  <p className="text-sm text-muted-foreground font-inter">Configure family notifications</p>
                </div>
              </div>
              <div className="text-muted-foreground">›</div>
            </button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Invite Family Member</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground font-inter">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Enter their full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="input-familyhub"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground font-inter">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="their@email.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="input-familyhub"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-foreground font-inter">
                Family Role
              </label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground font-inter">
                Members can view and edit shared lists. Parents have additional scheduling permissions.
              </p>
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowInviteDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleInviteMember}
              className="btn-primary flex-1"
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyManagement;
