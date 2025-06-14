import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  lists: GroceryList[];
  currentList: GroceryList | null;
  setCurrentList: (listId: string | null) => void;
  familyMembers: FamilyMember[];
  shareList: (listId: string, userId: string) => void;
  unshareList: (listId: string, userId: string) => void;
  categories: Category[];
  createList: (name: string) => void;
  deleteList: (listId: string) => void;
  updateList: (listId: string, updates: Partial<GroceryList>) => void;
  addItemToList: (listId: string, item: Omit<GroceryItem, 'id'>) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  toggleItemChecked: (listId: string, itemId: string) => void;
  updateItem: (listId: string, itemId: string, updates: Partial<GroceryItem>) => void;
  getFilteredItems: (query: string) => GroceryItem[];
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  getUserStats: () => UserStats;
  uploadAvatar: (file: File) => Promise<string>;
}

interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  ownerId: string;
  shared: boolean;
  sharedWith?: string[];
  createdAt?: string;
  lastUsed?: string;
}

interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
  quantity?: number;
  note?: string;
  category_slug?: string;
  icon?: string;
}

interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  role: 'admin' | 'parent' | 'member';
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
}

interface User {
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

interface UserStats {
  totalLists: number;
  totalItems: number;
  completedTasks: number;
  sharedLists: number;
  profileCompletion: number;
  joinedDaysAgo: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'cooking' | 'shopping' | 'tasks' | 'family';
}

// Enhanced mock data for demo
const mockLists: GroceryList[] = [
  {
    id: '1',
    name: 'Weekly Groceries',
    ownerId: 'user1',
    shared: false,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    items: [
      { id: '1', name: 'Milk', checked: false, quantity: 2, category_slug: 'dairy-eggs', icon: '🥛' },
      { id: '2', name: 'Bread', checked: true, quantity: 1, category_slug: 'bakery', icon: '🍞' },
      { id: '3', name: 'Apples', checked: false, quantity: 6, category_slug: 'fruits-vegetables', icon: '🍎' },
      { id: '4', name: 'Chicken Breast', checked: false, quantity: 1, note: 'Organic preferred', category_slug: 'meat-seafood', icon: '🍗' },
    ]
  },
  {
    id: '2',
    name: 'Party Shopping',
    ownerId: 'user1',
    shared: true,
    sharedWith: ['user2', 'user3'],
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    items: [
      { id: '5', name: 'Wine', checked: false, quantity: 2, category_slug: 'beverages', icon: '🍷' },
      { id: '6', name: 'Cheese', checked: false, quantity: 3, note: 'Variety pack', category_slug: 'dairy-eggs', icon: '🧀' },
      { id: '7', name: 'Crackers', checked: true, quantity: 2, category_slug: 'snacks', icon: '🍪' },
    ]
  },
  {
    id: '3',
    name: 'Healthy Meal Prep',
    ownerId: 'user1',
    shared: false,
    createdAt: new Date().toISOString(),
    lastUsed: new Date().toISOString(),
    items: [
      { id: '8', name: 'Quinoa', checked: false, quantity: 1, category_slug: 'pantry', icon: '🌾' },
      { id: '9', name: 'Salmon', checked: false, quantity: 2, category_slug: 'meat-seafood', icon: '🐟' },
      { id: '10', name: 'Avocado', checked: true, quantity: 4, category_slug: 'fruits-vegetables', icon: '🥑' },
    ]
  }
];

const mockFamilyMembers: FamilyMember[] = [
  { id: 'user2', name: 'Sarah', avatar: undefined, email: 'sarah@example.com', role: 'parent' },
  { id: 'user3', name: 'Mike', avatar: undefined, email: 'mike@example.com', role: 'parent' },
  { id: 'user4', name: 'Emma', avatar: undefined, email: 'emma@example.com', role: 'member' },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🥕', order: 1 },
  { id: '2', name: 'Meat & Seafood', slug: 'meat-seafood', icon: '🥩', order: 2 },
  { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥛', order: 3 },
  { id: '4', name: 'Bakery', slug: 'bakery', icon: '🍞', order: 4 },
  { id: '5', name: 'Pantry', slug: 'pantry', icon: '🥫', order: 5 },
  { id: '6', name: 'Frozen', slug: 'frozen', icon: '🧊', order: 6 },
  { id: '7', name: 'Beverages', slug: 'beverages', icon: '🥤', order: 7 },
  { id: '8', name: 'Snacks', slug: 'snacks', icon: '🍿', order: 8 }
];

const mockUser: User = {
  id: 'user1',
  name: 'Demo User',
  email: 'demo@koffa.app',
  avatar: undefined,
  phone: '+1 (555) 123-4567',
  bio: 'Family organizer who loves cooking and trying new recipes. Always looking for ways to make meal planning easier!',
  location: 'San Francisco, CA',
  dietaryPreferences: ['vegetarian', 'gluten-free'],
  cookingSkillLevel: 'intermediate',
  favoriteCuisines: ['Italian', 'Mediterranean', 'Asian'],
  familyRole: 'parent',
  joinedAt: '2024-01-01',
  notificationPreferences: {
    tasks: true,
    shopping: true,
    chef: true,
    family: true
  },
  preferences: {
    theme: 'light',
    language: 'en',
    privacy: 'family'
  }
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'List Master',
    description: 'Created 10 grocery lists',
    icon: '📝',
    unlockedAt: '2024-01-15',
    category: 'shopping'
  },
  {
    id: '2',
    title: 'Task Ninja',
    description: 'Completed 25 tasks',
    icon: '✅',
    unlockedAt: '2024-01-20',
    category: 'tasks'
  },
  {
    id: '3',
    title: 'Family Coordinator',
    description: 'Shared lists with all family members',
    icon: '👨‍👩‍👧‍👦',
    unlockedAt: '2024-01-25',
    category: 'family'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-authenticate for demo
  const [lists, setLists] = useState<GroceryList[]>(mockLists);
  const [currentList, setCurrentListState] = useState<GroceryList | null>(null);
  const [familyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [categories] = useState<Category[]>(mockCategories);
  const [user, setUser] = useState<User | null>(mockUser);

  const setCurrentList = (listId: string | null) => {
    if (listId) {
      const list = lists.find(l => l.id === listId);
      setCurrentListState(list || null);
    } else {
      setCurrentListState(null);
    }
  };

  const createList = (name: string) => {
    const newList: GroceryList = {
      id: Date.now().toString(),
      name,
      ownerId: 'user1',
      shared: false,
      items: [],
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    setLists(prev => [newList, ...prev]);
  };

  const deleteList = (listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
    if (currentList?.id === listId) {
      setCurrentListState(null);
    }
  };

  const updateList = (listId: string, updates: Partial<GroceryList>) => {
    setLists(prev => prev.map(list => 
      list.id === listId ? { ...list, ...updates } : list
    ));
  };

  const addItemToList = (listId: string, item: Omit<GroceryItem, 'id'>) => {
    const newItem: GroceryItem = {
      ...item,
      id: Date.now().toString()
    };
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, items: [...list.items, newItem] }
        : list
    ));
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.filter(item => item.id !== itemId) }
        : list
    ));
  };

  const toggleItemChecked = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ) 
          }
        : list
    ));
  };

  const updateItem = (listId: string, itemId: string, updates: Partial<GroceryItem>) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, ...updates } : item
            ) 
          }
        : list
    ));
  };

  const getFilteredItems = (query: string): GroceryItem[] => {
    const allItems = lists.flatMap(list => list.items);
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const shareList = (listId: string, userId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            shared: true, 
            sharedWith: [...(list.sharedWith || []), userId] 
          }
        : list
    ));
  };

  const unshareList = (listId: string, userId: string) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            sharedWith: (list.sharedWith || []).filter(id => id !== userId)
          }
        : list
    ));
  };

  const login = async (email: string, password: string) => {
    // Mock login for demo
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock register for demo
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

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

  const uploadAvatar = async (file: File): Promise<string> => {
    // Simulate file upload - in real app this would upload to storage
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`;
        if (user) {
          setUser({ ...user, avatar: mockUrl });
        }
        resolve(mockUrl);
      }, 1000);
    });
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      lists,
      currentList,
      setCurrentList,
      familyMembers,
      shareList,
      unshareList,
      categories,
      createList,
      deleteList,
      updateList,
      addItemToList,
      removeItemFromList,
      toggleItemChecked,
      updateItem,
      getFilteredItems,
      user,
      login,
      register,
      logout,
      updateUserProfile,
      getUserStats,
      uploadAvatar
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
