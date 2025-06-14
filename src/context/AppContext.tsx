
import React, { createContext, useContext, useState } from 'react';
import { GroceryList, GroceryItem, FamilyMember, Category } from '@/types/grocery';
import { User, UserStats } from '@/types/user';
import { mockLists, mockFamilyMembers, mockCategories, mockUser } from '@/data/mockData';
import { useUserStats } from '@/hooks/useUserStats';

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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-authenticate for demo
  const [lists, setLists] = useState<GroceryList[]>(mockLists);
  const [currentList, setCurrentListState] = useState<GroceryList | null>(null);
  const [familyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [categories] = useState<Category[]>(mockCategories);
  const [user, setUser] = useState<User | null>(mockUser);

  const { getUserStats } = useUserStats(user, lists);

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
