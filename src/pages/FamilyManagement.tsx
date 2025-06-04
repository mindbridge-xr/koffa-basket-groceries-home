
import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Mail, Settings, Crown, User, Baby, Shield } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'child';
  avatar?: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
}

export const FamilyManagement: React.FC = () => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'child'>('member');

  const familyMembers: FamilyMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'admin',
      joinedDate: '2024-01-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'member',
      joinedDate: '2024-01-02',
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      role: 'child',
      joinedDate: '2024-01-03',
      status: 'active'
    },
    {
      id: '4',
      name: 'Josh Johnson',
      email: 'josh.invited@example.com',
      role: 'member',
      joinedDate: '2024-01-10',
      status: 'pending'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'member': return User;
      case 'child': return Baby;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary text-white';
      case 'member': return 'bg-blue-100 text-blue-800';
      case 'child': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInviteMember = () => {
    if (inviteEmail.trim() && inviteEmail.includes('@')) {
      console.log('Inviting member:', { email: inviteEmail, role: inviteRole });
      setInviteEmail('');
      setInviteRole('member');
      setShowInviteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="mobile-padding">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-2xl text-foreground font-poppins">Family Circle</h1>
                <p className="text-sm text-muted-foreground font-inter">Manage family members and roles</p>
              </div>
            </div>
            <Button
              onClick={() => setShowInviteDialog(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Invite
            </Button>
          </div>
        </div>
      </div>

      <div className="mobile-spacing">
        {/* Family Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card-familyhub p-4 text-center">
            <div className="text-2xl font-bold text-primary font-poppins">{familyMembers.filter(m => m.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground font-inter">Active Members</div>
          </div>
          <div className="card-familyhub p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 font-poppins">{familyMembers.filter(m => m.status === 'pending').length}</div>
            <div className="text-sm text-muted-foreground font-inter">Pending</div>
          </div>
          <div className="card-familyhub p-4 text-center">
            <div className="text-2xl font-bold text-primary font-poppins">{familyMembers.filter(m => m.role === 'admin').length}</div>
            <div className="text-sm text-muted-foreground font-inter">Admins</div>
          </div>
        </div>

        {/* Family Members */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Family Members</h2>
          <div className="space-y-3">
            {familyMembers.map(member => {
              const RoleIcon = getRoleIcon(member.role);
              return (
                <div key={member.id} className="card-familyhub p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground font-poppins">{member.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground font-inter">
                          <Mail className="h-3 w-3" />
                          <span>{member.email}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-inter">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(member.role)}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {member.role}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role Permissions */}
        <div className="space-y-4 mt-8">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Role Permissions</h2>
          <div className="space-y-3">
            <div className="card-familyhub p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground font-poppins">Admin</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 font-inter">
                <li>• Manage family members and roles</li>
                <li>• Access all lists and tasks</li>
                <li>• Book chef services</li>
                <li>• Manage family schedule</li>
              </ul>
            </div>
            <div className="card-familyhub p-4">
              <div className="flex items-center space-x-3 mb-3">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-foreground font-poppins">Member</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 font-inter">
                <li>• Create and edit shared lists</li>
                <li>• Complete assigned tasks</li>
                <li>• View family schedule</li>
                <li>• Limited chef booking</li>
              </ul>
            </div>
            <div className="card-familyhub p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Baby className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-foreground font-poppins">Child</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 font-inter">
                <li>• Complete assigned tasks</li>
                <li>• View family schedule</li>
                <li>• Limited list access</li>
                <li>• Supervised activities only</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Invite Family Member</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter their email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="input-familyhub"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    inviteRole === 'member' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 text-muted-foreground'
                  }`}
                  onClick={() => setInviteRole('member')}
                >
                  <User className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium font-inter">Member</div>
                </button>
                <button
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    inviteRole === 'child' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-gray-200 text-muted-foreground'
                  }`}
                  onClick={() => setInviteRole('child')}
                >
                  <Baby className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium font-inter">Child</div>
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-inter">
              They'll receive an invitation email to join your family circle.
            </p>
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
              disabled={!inviteEmail.includes('@')}
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
