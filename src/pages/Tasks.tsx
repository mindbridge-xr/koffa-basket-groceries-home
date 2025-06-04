import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Clock, User, AlertCircle, Check, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar?: string;
    initial: string;
  };
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
}

export const Tasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'pending'>('all');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      description: 'Buy items for weekly meal prep',
      assignee: { name: 'Sarah', initial: 'S' },
      priority: 'high',
      dueDate: '2024-01-15',
      status: 'pending',
      category: 'Shopping'
    },
    {
      id: '2',
      title: 'Clean Kitchen',
      description: 'Deep clean after dinner party',
      assignee: { name: 'Mike', initial: 'M' },
      priority: 'medium',
      dueDate: '2024-01-14',
      status: 'in-progress',
      category: 'Cleaning'
    },
    {
      id: '3',
      title: 'Plan Birthday Party',
      description: 'Organize Emma\'s birthday celebration',
      assignee: { name: 'Sarah', initial: 'S' },
      priority: 'high',
      dueDate: '2024-01-20',
      status: 'pending',
      category: 'Events'
    },
    {
      id: '4',
      title: 'Fix Leaky Faucet',
      description: 'Call plumber or attempt DIY repair',
      assignee: { name: 'Mike', initial: 'M' },
      priority: 'low',
      dueDate: '2024-01-18',
      status: 'completed',
      category: 'Maintenance'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'my', label: 'My Tasks', count: tasks.filter(t => t.assignee.name === 'Sarah').length },
    { id: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length }
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'my') return task.assignee.name === 'Sarah';
    if (activeTab === 'pending') return task.status === 'pending';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-badge bg-blue-100 text-blue-800';
      case 'pending': return 'status-pending';
      default: return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      // Add task creation logic here
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowNewTaskDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="mobile-padding">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-bold text-2xl text-foreground font-poppins">Family Tasks</h1>
              <p className="text-sm text-muted-foreground font-inter">
                {tasks.filter(t => t.status === 'completed').length} of {tasks.length} completed
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="status-completed">
                {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
              </div>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 font-inter ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-spacing">
        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <div key={task.id} className={`card-familyhub p-4 ${getPriorityColor(task.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground mb-1 font-poppins">
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 font-inter">
                    {task.description}
                  </p>
                </div>
                <span className={getStatusBadge(task.status)}>
                  {task.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {task.assignee.initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground font-inter">
                      {task.assignee.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className={`text-xs font-inter ${
                      isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-muted-foreground'
                    }`}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    {isOverdue(task.dueDate) && (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground font-inter">
                  {task.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="card-familyhub p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">
              No tasks found
            </h3>
            <p className="text-sm text-muted-foreground font-inter">
              {activeTab === 'all' ? 'Create your first task to get started' : 'No tasks match your current filter'}
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowNewTaskDialog(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200 z-40"
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      <BottomNav />

      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="card-familyhub mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold font-poppins">Create New Task</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Task Title
              </label>
              <Input
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="input-familyhub"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                Description
              </label>
              <Input
                placeholder="Add more details..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="input-familyhub"
              />
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNewTaskDialog(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTask}
              disabled={!newTaskTitle.trim()}
              className="btn-primary flex-1"
            >
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
