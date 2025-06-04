
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bell, Plus, Users, CheckCircle, ShoppingCart, ChefHat, Calendar, Clock } from 'lucide-react';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { getGreeting, getCurrentTime } from '@/utils/timeUtils';

export const Dashboard: React.FC = () => {
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const { lists, createList, user } = useApp();
  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setShowNewListDialog(false);
    }
  };

  const quickActions = [
    {
      title: "Create Task",
      description: "Assign family tasks",
      icon: CheckCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      onClick: () => navigate('/tasks')
    },
    {
      title: "Shopping List",
      description: "Add grocery items",
      icon: ShoppingCart,
      color: "text-green-500",
      bgColor: "bg-green-50",
      onClick: () => setShowNewListDialog(true)
    },
    {
      title: "Book Chef",
      description: "Professional cooking",
      icon: ChefHat,
      color: "text-primary",
      bgColor: "bg-orange-50",
      onClick: () => navigate('/chef-marketplace')
    },
    {
      title: "Schedule",
      description: "Family calendar",
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      onClick: () => navigate('/schedule')
    }
  ];

  const recentActivity = [
    { action: 'Sarah completed "Buy groceries"', time: '2 hours ago', icon: '✅' },
    { action: 'Mike added "Dinner party prep" to tasks', time: '4 hours ago', icon: '📝' },
    { action: 'Chef booking confirmed for Saturday', time: '1 day ago', icon: '👨‍🍳' },
    { action: 'Weekly meal plan updated', time: '2 days ago', icon: '🍽️' }
  ];

  const familyMembers = [
    { name: 'Sarah', avatar: '', initial: 'S' },
    { name: 'Mike', avatar: '', initial: 'M' },
    { name: 'Emma', avatar: '', initial: 'E' },
    { name: 'Josh', avatar: '', initial: 'J' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="mobile-padding">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm font-poppins">F</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg font-poppins">FamilyHub</h1>
                <p className="text-xs text-muted-foreground font-inter">Johnson Family • {currentTime}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-6 w-6 text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">3</span>
                </div>
              </div>
              <Avatar className="w-8 h-8 border-2 border-gray-100">
                <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">
                  {user?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-primary mobile-padding">
        <div className="text-center py-6">
          <h2 className="font-semibold text-xl text-white mb-1 font-poppins">
            {getGreeting(user?.name?.split(' ')[0])}
          </h2>
          <p className="text-white/90 font-inter">Ready to organize your family's day?</p>
          
          <div className="mt-4 mb-6">
            <div className="font-bold text-2xl text-white font-poppins">8</div>
            <div className="text-sm text-white/80 font-inter">Active Tasks</div>
          </div>
          
          <div className="flex justify-center -space-x-2">
            {familyMembers.map((member, index) => (
              <Avatar key={index} className="w-8 h-8 border-2 border-white">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-white text-primary text-xs font-medium">
                  {member.initial}
                </AvatarFallback>
              </Avatar>
            ))}
            <button 
              onClick={() => navigate('/family-management')}
              className="w-8 h-8 border-2 border-white bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-spacing space-y-6">
        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="card-familyhub-hover p-4 text-left"
              >
                <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1 font-poppins">
                  {action.title}
                </h3>
                <p className="text-xs text-muted-foreground font-inter">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground font-poppins">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="card-familyhub p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-inter">{activity.action}</p>
                    <p className="text-xs text-muted-foreground font-inter">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lists */}
        {lists.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-foreground font-poppins">Your Lists</h2>
              <button 
                className="text-primary font-medium text-sm hover:text-primary/80 transition-colors font-inter"
                onClick={() => navigate('/lists')}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {lists.slice(0, 3).map(list => (
                <div key={list.id} className="card-familyhub-hover p-4" onClick={() => navigate(`/list/${list.id}`)}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-base text-foreground font-poppins">{list.name}</h3>
                      <p className="text-sm text-muted-foreground font-inter">{list.items.length} items</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <FloatingActionButton 
        onClick={() => setShowNewListDialog(true)} 
        label="New List"
        icon={<Plus className="h-5 w-5" />}
        className="bg-gradient-primary shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
      />
      <BottomNav />
      
      {/* Dialog */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="input-familyhub"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <p className="text-sm text-muted-foreground font-inter">
              Tip: Use descriptive names like "Weekly Groceries" or "Birthday Party Shopping"
            </p>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNewListDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateList}
              disabled={!newListName.trim()}
              className="btn-primary flex-1"
            >
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
