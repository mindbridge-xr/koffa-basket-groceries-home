
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GroceryItem, GroceryList, Category, User } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Define categories constant
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables' },
  { id: '2', name: 'Bread & Pastries', slug: 'bread-pastries' },
  { id: '3', name: 'Milk & Cheese', slug: 'milk-cheese' },
  { id: '4', name: 'Meat & Fish', slug: 'meat-fish' },
  { id: '5', name: 'Ingredients & Spices', slug: 'ingredients-spices' },
  { id: '6', name: 'Frozen & Convenience', slug: 'frozen-convenience' },
  { id: '7', name: 'Grain Products', slug: 'grain-products' },
  { id: '8', name: 'Snacks & Sweets', slug: 'snacks-sweets' },
  { id: '9', name: 'Beverages', slug: 'beverages' },
  { id: '10', name: 'Household', slug: 'household' },
  { id: '11', name: 'Care & Health', slug: 'care-health' },
  { id: '12', name: 'Pet Supplies', slug: 'pet-supplies' },
  { id: '13', name: 'Home & Garden', slug: 'home-garden' },
  { id: '14', name: 'Own Items', slug: 'own-items' },
];

// Sample items data
const SAMPLE_ITEMS: GroceryItem[] = [
  { id: '1', name: 'Apples', category: 'Fruits & Vegetables', category_slug: 'fruits-vegetables', icon: '🍎' },
  { id: '2', name: 'Bananas', category: 'Fruits & Vegetables', category_slug: 'fruits-vegetables', icon: '🍌' },
  { id: '3', name: 'Bread', category: 'Bread & Pastries', category_slug: 'bread-pastries', icon: '🍞' },
  { id: '4', name: 'Milk', category: 'Milk & Cheese', category_slug: 'milk-cheese', icon: '🥛' },
  { id: '5', name: 'Eggs', category: 'Milk & Cheese', category_slug: 'milk-cheese', icon: '🥚' },
  { id: '6', name: 'Chicken', category: 'Meat & Fish', category_slug: 'meat-fish', icon: '🍗' },
  { id: '7', name: 'Salt', category: 'Ingredients & Spices', category_slug: 'ingredients-spices', icon: '🧂' },
  { id: '8', name: 'Ice Cream', category: 'Frozen & Convenience', category_slug: 'frozen-convenience', icon: '🍦' },
  { id: '9', name: 'Rice', category: 'Grain Products', category_slug: 'grain-products', icon: '🍚' },
  { id: '10', name: 'Chocolate', category: 'Snacks & Sweets', category_slug: 'snacks-sweets', icon: '🍫' },
  { id: '11', name: 'Water', category: 'Beverages', category_slug: 'beverages', icon: '💧' },
  { id: '12', name: 'Soap', category: 'Household', category_slug: 'household', icon: '🧼' },
  { id: '13', name: 'Shampoo', category: 'Care & Health', category_slug: 'care-health', icon: '🧴' },
  { id: '14', name: 'Dog Food', category: 'Pet Supplies', category_slug: 'pet-supplies', icon: '🦴' },
];

// Sample lists
const SAMPLE_LISTS: GroceryList[] = [
  {
    id: '1',
    name: 'Weekly Shopping',
    items: [SAMPLE_ITEMS[0], SAMPLE_ITEMS[3], SAMPLE_ITEMS[5]],
    ownerId: '1',
    shared: false
  },
  {
    id: '2',
    name: 'Party Supplies',
    items: [SAMPLE_ITEMS[1], SAMPLE_ITEMS[9], SAMPLE_ITEMS[10]],
    ownerId: '1',
    shared: true,
    sharedWith: ['2']
  }
];

// Mock current user
const CURRENT_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/lovable-uploads/bdb9f2ed-22a2-40aa-8476-f1681c0b1f4d.png'
};

// Mock family members
const FAMILY_MEMBERS: User[] = [
  CURRENT_USER,
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@example.com'
  }
];

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  currentList: GroceryList | null;
  lists: GroceryList[];
  categories: Category[];
  popularItems: GroceryItem[];
  familyMembers: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  createList: (name: string) => void;
  updateList: (list: GroceryList) => void;
  deleteList: (listId: string) => void;
  setCurrentList: (listId: string | null) => void;
  addItemToList: (listId: string, item: Partial<GroceryItem>) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  toggleItemChecked: (listId: string, itemId: string) => void;
  shareList: (listId: string, userId: string) => void;
  unshareList: (listId: string, userId: string) => void;
  getFilteredItems: (search: string) => GroceryItem[];
  getItemsByCategory: (categorySlug: string) => GroceryItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lists, setLists] = useState<GroceryList[]>(SAMPLE_LISTS);
  const [currentList, setCurrentListState] = useState<GroceryList | null>(null);
  const [popularItems] = useState<GroceryItem[]>(SAMPLE_ITEMS);
  const [familyMembers] = useState<User[]>(FAMILY_MEMBERS);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser(CURRENT_USER);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to Koffa!",
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentListState(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      const newUser = {
        id: uuidv4(),
        name,
        email,
        avatar: undefined
      };
      setUser(newUser);
      toast({
        title: "Account created",
        description: "Welcome to Koffa!",
      });
    } else {
      throw new Error('Invalid registration details');
    }
  };

  const createList = (name: string) => {
    if (!user) return;
    
    const newList: GroceryList = {
      id: uuidv4(),
      name,
      items: [],
      ownerId: user.id,
      shared: false
    };
    
    setLists([...lists, newList]);
    setCurrentListState(newList);
    toast({
      title: "List created",
      description: `Your list "${name}" has been created`,
    });
  };

  const updateList = (updatedList: GroceryList) => {
    setLists(lists.map(list => list.id === updatedList.id ? updatedList : list));
    if (currentList?.id === updatedList.id) {
      setCurrentListState(updatedList);
    }
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
    if (currentList?.id === listId) {
      setCurrentListState(null);
    }
    toast({
      title: "List deleted",
      description: "Your list has been deleted",
    });
  };

  const setCurrentList = (listId: string | null) => {
    if (!listId) {
      setCurrentListState(null);
      return;
    }
    
    const list = lists.find(l => l.id === listId);
    setCurrentListState(list || null);
  };

  const addItemToList = (listId: string, item: Partial<GroceryItem>) => {
    const listToUpdate = lists.find(l => l.id === listId);
    
    if (listToUpdate) {
      const newItem: GroceryItem = {
        id: uuidv4(),
        name: item.name || '',
        category: item.category || 'Own Items',
        category_slug: item.category_slug || 'own-items',
        icon: item.icon,
        checked: false,
        quantity: item.quantity || 1,
        note: item.note || ''
      };
      
      const updatedList = {
        ...listToUpdate,
        items: [...listToUpdate.items, newItem]
      };
      
      updateList(updatedList);
      toast({
        title: "Item added",
        description: `${newItem.name} has been added to your list`,
      });
    }
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    const listToUpdate = lists.find(l => l.id === listId);
    
    if (listToUpdate) {
      const updatedList = {
        ...listToUpdate,
        items: listToUpdate.items.filter(item => item.id !== itemId)
      };
      
      updateList(updatedList);
      toast({
        title: "Item removed",
        description: "Item has been removed from your list",
      });
    }
  };

  const toggleItemChecked = (listId: string, itemId: string) => {
    const listToUpdate = lists.find(l => l.id === listId);
    
    if (listToUpdate) {
      const updatedList = {
        ...listToUpdate,
        items: listToUpdate.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      };
      
      updateList(updatedList);
    }
  };

  const shareList = (listId: string, userId: string) => {
    const listToUpdate = lists.find(l => l.id === listId);
    
    if (listToUpdate) {
      const sharedWith = listToUpdate.sharedWith || [];
      
      if (!sharedWith.includes(userId)) {
        const updatedList = {
          ...listToUpdate,
          shared: true,
          sharedWith: [...sharedWith, userId]
        };
        
        updateList(updatedList);
        toast({
          title: "List shared",
          description: "Your list has been shared successfully",
        });
      }
    }
  };

  const unshareList = (listId: string, userId: string) => {
    const listToUpdate = lists.find(l => l.id === listId);
    
    if (listToUpdate && listToUpdate.sharedWith) {
      const updatedSharedWith = listToUpdate.sharedWith.filter(id => id !== userId);
      
      const updatedList = {
        ...listToUpdate,
        shared: updatedSharedWith.length > 0,
        sharedWith: updatedSharedWith
      };
      
      updateList(updatedList);
      toast({
        title: "Sharing removed",
        description: "User no longer has access to your list",
      });
    }
  };

  const getFilteredItems = (search: string) => {
    if (!search) return [];
    
    const query = search.toLowerCase();
    return popularItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  };

  const getItemsByCategory = (categorySlug: string) => {
    return popularItems.filter(item => item.category_slug === categorySlug);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      currentList,
      lists,
      categories: CATEGORIES,
      popularItems,
      familyMembers,
      login,
      logout,
      register,
      createList,
      updateList,
      deleteList,
      setCurrentList,
      addItemToList,
      removeItemFromList,
      toggleItemChecked,
      shareList,
      unshareList,
      getFilteredItems,
      getItemsByCategory
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
