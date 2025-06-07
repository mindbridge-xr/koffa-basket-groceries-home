
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: string;
  title: string;
  description: string;
  category: 'cooking' | 'shopping' | 'cleaning' | 'planning';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  dueDate: string;
  estimatedTime: number;
}

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const familyMembers = ['Sarah', 'Mike', 'Emma', 'Josh'];

export const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onOpenChange,
  onAddTask
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'planning' as const,
    priority: 'medium' as const,
    assignedTo: '',
    dueDate: '',
    estimatedTime: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.dueDate) {
      onAddTask({
        ...formData,
        assignedTo: formData.assignedTo || undefined
      });
      setFormData({
        title: '',
        description: '',
        category: 'planning',
        priority: 'medium',
        assignedTo: '',
        dueDate: '',
        estimatedTime: 30
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-familyhub mx-4 max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-semibold font-poppins">Add New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="input-familyhub"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-familyhub min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cooking">🍳 Cooking</SelectItem>
                  <SelectItem value="shopping">🛒 Shopping</SelectItem>
                  <SelectItem value="cleaning">🧹 Cleaning</SelectItem>
                  <SelectItem value="planning">📅 Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Priority</Label>
              <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-medium">Assign To</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {familyMembers.map(member => (
                    <SelectItem key={member} value={member}>{member}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedTime" className="font-medium">Time (minutes)</Label>
              <Input
                id="estimatedTime"
                type="number"
                min="5"
                max="480"
                value={formData.estimatedTime}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 30 }))}
                className="input-familyhub"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="font-medium">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="input-familyhub"
              required
            />
          </div>

          <DialogFooter className="space-x-3 pt-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="btn-primary flex-1"
              disabled={!formData.title.trim() || !formData.dueDate}
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
