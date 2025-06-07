
import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  getTaskStats: () => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const addTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      status: 'pending'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, getTaskStats }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
