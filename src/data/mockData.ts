
import { GroceryList, FamilyMember, Category } from '@/types/grocery';
import { User, Achievement } from '@/types/user';

export const mockLists: GroceryList[] = [
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

export const mockFamilyMembers: FamilyMember[] = [
  { id: 'user2', name: 'Sarah', avatar: undefined, email: 'sarah@example.com', role: 'parent' },
  { id: 'user3', name: 'Mike', avatar: undefined, email: 'mike@example.com', role: 'parent' },
  { id: 'user4', name: 'Emma', avatar: undefined, email: 'emma@example.com', role: 'member' },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🥕', order: 1 },
  { id: '2', name: 'Meat & Seafood', slug: 'meat-seafood', icon: '🥩', order: 2 },
  { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥛', order: 3 },
  { id: '4', name: 'Bakery', slug: 'bakery', icon: '🍞', order: 4 },
  { id: '5', name: 'Pantry', slug: 'pantry', icon: '🥫', order: 5 },
  { id: '6', name: 'Frozen', slug: 'frozen', icon: '🧊', order: 6 },
  { id: '7', name: 'Beverages', slug: 'beverages', icon: '🥤', order: 7 },
  { id: '8', name: 'Snacks', slug: 'snacks', icon: '🍿', order: 8 }
];

export const mockUser: User = {
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

export const mockAchievements: Achievement[] = [
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
