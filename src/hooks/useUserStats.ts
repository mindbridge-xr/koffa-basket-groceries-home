
import { User, UserStats } from '@/types/user';
import { GroceryList } from '@/types/grocery';
import { mockAchievements } from '@/data/mockData';

export const useUserStats = (user: User | null, lists: GroceryList[]) => {
  const getUserStats = (): UserStats => {
    const completedTasks = 0; // This will be calculated from TaskContext
    const totalItems = lists.reduce((sum, list) => sum + list.items.length, 0);
    const sharedLists = lists.filter(list => list.shared).length;
    
    // Calculate profile completion
    const requiredFields = ['name', 'email', 'phone', 'bio', 'location'];
    const completedFields = requiredFields.filter(field => user?.[field as keyof User]);
    const profileCompletion = Math.round((completedFields.length / requiredFields.length) * 100);
    
    const joinedDaysAgo = user?.joinedAt ? 
      Math.floor((Date.now() - new Date(user.joinedAt).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    
    return {
      totalLists: lists.length,
      totalItems,
      completedTasks,
      sharedLists,
      profileCompletion,
      joinedDaysAgo,
      achievements: mockAchievements
    };
  };

  return { getUserStats };
};
