
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
}

interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  ownerId: string;
  shared: boolean;
  sharedWith?: string[];
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
}

// Enhanced mock data for demo
const mockLists: GroceryList[] = [
  {
    id: '1',
    name: 'Weekly Groceries',
    ownerId: 'user1',
    shared: false,
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
    items: [
      { id: '8', name: 'Quinoa', checked: false, quantity: 1, category_slug: 'pantry', icon: '🌾' },
      { id: '9', name: 'Salmon', checked: false, quantity: 2, category_slug: 'meat-seafood', icon: '🐟' },
      { id: '10', name: 'Avocado', checked: true, quantity: 4, category_slug: 'fruits-vegetables', icon: '🥑' },
    ]
  }
];

const mockFamilyMembers: FamilyMember[] = [
  { id: 'user2', name: 'Sarah', avatar: undefined },
  { id: 'user3', name: 'Mike', avatar: undefined },
  { id: 'user4', name: 'Emma', avatar: undefined },
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-authenticate for demo
  const [lists, setLists] = useState<GroceryList[]>(mockLists);
  const [currentList, setCurrentListState] = useState<GroceryList | null>(null);
  const [familyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [categories] = useState<Category[]>(mockCategories);

  const setCurrentList = (listId: string | null) => {
    if (listId) {
      const list = lists.find(l => l.id === listId);
      setCurrentListState(list || null);
    } else {
      setCurrentListState(null);
    }
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
      categories
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
