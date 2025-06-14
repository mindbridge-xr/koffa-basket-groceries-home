
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  dietaryPreferences?: string[];
  cookingSkillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  favoriteCuisines?: string[];
  familyRole?: 'parent' | 'guardian' | 'teen' | 'child';
  joinedAt?: string;
  notificationPreferences?: {
    tasks: boolean;
    shopping: boolean;
    chef: boolean;
    family: boolean;
  };
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    privacy: 'public' | 'family' | 'private';
  };
}

export interface UserStats {
  totalLists: number;
  totalItems: number;
  completedTasks: number;
  sharedLists: number;
  profileCompletion: number;
  joinedDaysAgo: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'cooking' | 'shopping' | 'tasks' | 'family';
}

export interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  role: 'admin' | 'parent' | 'member';
}
