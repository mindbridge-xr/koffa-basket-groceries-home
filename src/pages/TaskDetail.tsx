
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { BottomNav } from '@/components/BottomNav';
import { useTasks } from '@/context/TaskContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTaskStatus } = useTasks();
  
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Task not found</h2>
          <Button onClick={() => navigate('/tasks')} variant="outline">
            Back to Tasks
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <PageHeader 
        title="Task Details"
        showBack
        onBack={() => navigate('/tasks')}
      />
      
      <div className="mobile-spacing space-y-6">
        <div className="card-familyhub p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground font-poppins flex-1">
              {task.title}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={`${getStatusColor(task.status)} border-0`}>
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge className={`${getPriorityColor(task.priority)} border-0`}>
              {task.priority} priority
            </Badge>
          </div>

          {task.description && (
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-2 font-poppins">Description</h3>
              <p className="text-muted-foreground font-inter">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {task.assignedTo && (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground font-poppins">Assigned to</p>
                  <p className="text-sm text-muted-foreground font-inter">{task.assignedTo}</p>
                </div>
              </div>
            )}
            
            {task.dueDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground font-poppins">Due Date</p>
                  <p className="text-sm text-muted-foreground font-inter">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            {task.status !== 'completed' && (
              <Button 
                onClick={() => updateTaskStatus(task.id, 'completed')}
                className="btn-primary flex-1"
              >
                Mark Complete
              </Button>
            )}
            {task.status === 'pending' && (
              <Button 
                onClick={() => updateTaskStatus(task.id, 'in-progress')}
                variant="outline"
                className="flex-1"
              >
                Start Task
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TaskDetail;
