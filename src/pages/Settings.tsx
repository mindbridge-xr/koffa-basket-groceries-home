
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { PageHeader } from '@/components/PageHeader';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: 'Manage your personal information',
          onClick: () => navigate('/profile')
        },
        {
          icon: Shield,
          label: 'Privacy & Security',
          description: 'Control your privacy settings',
          onClick: () => {}
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Manage notification preferences',
          hasSwitch: true,
          switchValue: true
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help and contact support',
          onClick: () => {}
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <PageHeader 
        title="Settings"
        showBack
        onBack={() => navigate('/')}
      />
      
      <div className="mobile-spacing space-y-6">
        {/* User Profile Card */}
        <div className="card-familyhub p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold font-poppins">
                {user?.name?.[0] || 'U'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground font-poppins">
                {user?.name || 'User'}
              </h3>
              <p className="text-sm text-muted-foreground font-inter">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <h2 className="font-semibold text-lg text-foreground font-poppins px-1">
              {group.title}
            </h2>
            <div className="card-familyhub divide-y divide-gray-100">
              {group.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className={`p-4 ${item.onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  onClick={item.onClick}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground font-poppins">
                          {item.label}
                        </h3>
                        <p className="text-sm text-muted-foreground font-inter">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {item.hasSwitch ? (
                      <Switch checked={item.switchValue} />
                    ) : item.onClick && (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="card-familyhub p-4">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
