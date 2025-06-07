import React, { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { Plus, CheckCircle, Clock, Calendar, Users, Star, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'cooking' | 'shopping' | 'cleaning' | 'planning';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate: string;
  estimatedTime: number; // in minutes
}

export const Tasks: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Plan Weekly Meals',
      description: 'Create meal plan for next week including shopping list',
      category: 'planning',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sarah',
      dueDate: '2024-01-15',
      estimatedTime: 30
    },
    {
      id: '2',
      title: 'Grocery Shopping',
      description: 'Buy ingredients for this week\'s meals',
      category: 'shopping',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Mike',
      dueDate: '2024-01-14',
      estimatedTime: 60
    },
    {
      id: '3',
      title: 'Prep Sunday Dinner',
      description: 'Prepare ingredients for family Sunday dinner',
      category: 'cooking',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'Sarah',
      dueDate: '2024-01-13',
      estimatedTime: 45
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      status: 'pending'
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task created!",
      description: `"${newTask.title}" has been added to your tasks.`,
    });
  };

  const categories = [
    { id: 'all', name: 'All Tasks', icon: '📋', color: 'bg-gray-100' },
    { id: 'cooking', name: 'Cooking', icon: '🍳', color: 'bg-orange-100' },
    { id: 'shopping', name: 'Shopping', icon: '🛒', color: 'bg-blue-100' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', color: 'bg-green-100' },
    { id: 'planning', name: 'Planning', icon: '📅', color: 'bg-purple-100' }
  ];

  const priorities = [
    { id: 'all', name: 'All Priorities' },
    { id: 'high', name: 'High Priority', color: 'bg-red-100 text-red-800' },
    { id: 'medium', name: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'low', name: 'Low Priority', color: 'bg-green-100 text-green-800' }
  ];

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || task.priority === selectedPriority;
    const statusMatch = showCompleted || task.status !== 'completed';
    return categoryMatch && priorityMatch && statusMatch;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 
                         task.status === 'pending' ? 'in-progress' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || '📋';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Family Tasks"
        subtitle="Manage and track family activities"
      >
        <Button 
          className="btn-primary"
          onClick={() => setShowAddTask(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </PageHeader>

      <div className="mobile-spacing space-y-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-lg font-bold text-foreground font-poppins">{taskStats.total}</div>
            <div className="text-xs text-muted-foreground font-inter">Total</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-lg font-bold text-yellow-600 font-poppins">{taskStats.pending}</div>
            <div className="text-xs text-muted-foreground font-inter">Pending</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-lg font-bold text-blue-600 font-poppins">{taskStats.inProgress}</div>
            <div className="text-xs text-muted-foreground font-inter">In Progress</div>
          </div>
          <div className="text-center bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-lg font-bold text-green-600 font-poppins">{taskStats.completed}</div>
            <div className="text-xs text-muted-foreground font-inter">Done</div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Additional Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`btn-secondary ${showCompleted ? 'bg-primary/10 border-primary' : ''}`}
                onClick={() => setShowCompleted(!showCompleted)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {showCompleted ? 'Hide' : 'Show'} Completed
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="btn-secondary">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <Card key={task.id} className="card-familyhub-hover">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.status === 'completed'
                        ? 'bg-green-500 border-green-500'
                        : task.status === 'in-progress'
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {task.status === 'completed' && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                    {task.status === 'in-progress' && (
                      <Clock className="h-3 w-3 text-white" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold text-base font-poppins ${
                          task.status === 'completed' 
                            ? 'text-muted-foreground line-through' 
                            : 'text-foreground'
                        }`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 font-inter">
                          {task.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(task.status)}`}
                        >
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="mr-1">{getCategoryIcon(task.category)}</span>
                          <span className="capitalize font-inter">{task.category}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="font-inter">{task.estimatedTime}m</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="font-inter">{task.dueDate}</span>
                        </div>
                      </div>
                      
                      {task.assignedTo && (
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span className="font-inter">{task.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card className="card-familyhub p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No tasks found</h3>
            <p className="text-sm text-muted-foreground mb-4 font-inter">
              {showCompleted ? 'No completed tasks to display.' : 'All tasks are completed! Great job! 🎉'}
            </p>
            <Button 
              className="btn-primary"
              onClick={() => setShowAddTask(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Task
            </Button>
          </Card>
        )}
      </div>

      <AddTaskDialog 
        open={showAddTask}
        onOpenChange={setShowAddTask}
        onAddTask={handleAddTask}
      />

      <BottomNav />
    </div>
  );
};

export default Tasks;
