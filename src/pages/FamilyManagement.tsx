
import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { Users, Plus, Mail, Settings, Crown, User, Baby, Shield, Car, Heart, UserPlus, Copy, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'child' | 'driver' | 'nanny' | 'helper' | 'guest';
  avatar?: string;
  joinedDate: string;
  status: 'active' | 'pending' | 'inactive';
  inviteCode?: string;
}

export const FamilyManagement: React.FC = () => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'child' | 'driver' | 'nanny' | 'helper' | 'guest'>('member');
  const [generatedCode, setGeneratedCode] = useState('');
  const { toast } = useToast();

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
      status: 'pending',
      inviteCode: 'FAM-2024-ABC'
    }
  ];

  const roleOptions = [
    { id: 'member', name: 'Member', icon: User, description: 'Full family member access' },
    { id: 'child', name: 'Child', icon: Baby, description: 'Limited access for children' },
    { id: 'driver', name: 'Driver', icon: Car, description: 'Transportation services' },
    { id: 'nanny', name: 'Nanny', icon: Heart, description: 'Childcare services' },
    { id: 'helper', name: 'Helper', icon: UserPlus, description: 'General assistance' },
    { id: 'guest', name: 'Guest', icon: Shield, description: 'Temporary access' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'member': return User;
      case 'child': return Baby;
      case 'driver': return Car;
      case 'nanny': return Heart;
      case 'helper': return UserPlus;
      case 'guest': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary text-white';
      case 'member': return 'bg-blue-100 text-blue-800';
      case 'child': return 'bg-green-100 text-green-800';
      case 'driver': return 'bg-purple-100 text-purple-800';
      case 'nanny': return 'bg-pink-100 text-pink-800';
      case 'helper': return 'bg-orange-100 text-orange-800';
      case 'guest': return 'bg-gray-100 text-gray-800';
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

  const generateInviteCode = () => {
    const code = `FAM-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    setGeneratedCode(code);
    return code;
  };

  const handleInviteMember = () => {
    if (inviteEmail.trim() && inviteEmail.includes('@')) {
      const code = generateInviteCode();
      console.log('Inviting member:', { email: inviteEmail, role: inviteRole, code });
      toast({
        title: "Invitation Sent!",
        description: `Invite code ${code} has been generated and sent to ${inviteEmail}`,
      });
      setInviteEmail('');
      setInviteRole('member');
      setShowInviteDialog(false);
    }
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: "Invite code copied to clipboard",
    });
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setShowEditDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      <PageHeader 
        title="Family Circle"
        subtitle="Manage family members and roles"
        showBack={true}
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
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="card-familyhub p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary font-poppins">{familyMembers.filter(m => m.status === 'active').length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-inter">Active</div>
          </div>
          <div className="card-familyhub p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600 font-poppins">{familyMembers.filter(m => m.status === 'pending').length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-inter">Pending</div>
          </div>
          <div className="card-familyhub p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary font-poppins">{familyMembers.filter(m => m.role === 'admin').length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground font-inter">Admins</div>
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-foreground font-poppins truncate">{member.name}</h3>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground font-inter">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        {member.inviteCode && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground font-inter mt-1">
                            <span>Code: {member.inviteCode}</span>
                            <button 
                              onClick={() => copyInviteCode(member.inviteCode!)}
                              className="text-primary hover:text-primary/80"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground font-inter mt-1">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getRoleColor(member.role)} text-xs`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {member.role}
                        </Badge>
                        <Badge variant="outline" className={`${getStatusColor(member.status)} text-xs`}>
                          {member.status}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground h-8 w-8 p-0"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground h-8 w-8 p-0"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role Permissions */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Role Permissions</h2>
          <div className="grid gap-3">
            {roleOptions.map(role => {
              const RoleIcon = role.icon;
              return (
                <div key={role.id} className="card-familyhub p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <RoleIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium text-foreground font-poppins capitalize">{role.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-inter">{role.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="card-familyhub mx-4 max-w-md">
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
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map(role => (
                  <button
                    key={role.id}
                    className={`p-3 rounded-lg border-2 transition-colors text-center ${
                      inviteRole === role.id 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-gray-200 text-muted-foreground hover:border-gray-300'
                    }`}
                    onClick={() => setInviteRole(role.id as any)}
                  >
                    <role.icon className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-xs font-medium font-inter">{role.name}</div>
                  </button>
                ))}
              </div>
            </div>
            {generatedCode && (
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Invite Code: {generatedCode}</span>
                  <button 
                    onClick={() => copyInviteCode(generatedCode)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            <p className="text-sm text-muted-foreground font-inter">
              They'll receive an invitation email with a unique code to join your family circle.
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

      {/* Edit Member Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="card-familyhub mx-4 max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Edit Family Member</DialogTitle>
          </DialogHeader>
          {editingMember && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Name
                </label>
                <Input
                  value={editingMember.name}
                  className="input-familyhub"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map(role => (
                    <button
                      key={role.id}
                      className={`p-3 rounded-lg border-2 transition-colors text-center ${
                        editingMember.role === role.id 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-gray-200 text-muted-foreground hover:border-gray-300'
                      }`}
                    >
                      <role.icon className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs font-medium font-inter">{role.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowEditDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Member Updated!",
                  description: "Family member details have been saved",
                });
                setShowEditDialog(false);
              }}
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

export default FamilyManagement;
