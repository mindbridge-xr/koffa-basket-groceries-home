
import { GroceryItem } from '@/types';
import { SmartListItem, StoreSection } from '@/types/smartShopping';

const STORE_SECTIONS_ORDER = [
  { name: 'Produce', icon: '🥬', categories: ['fruits-vegetables'] },
  { name: 'Dairy & Eggs', icon: '🥛', categories: ['dairy-eggs'] },
  { name: 'Meat & Seafood', icon: '🥩', categories: ['meat-seafood'] },
  { name: 'Bakery', icon: '🍞', categories: ['bakery'] },
  { name: 'Pantry', icon: '🏺', categories: ['pantry'] },
  { name: 'Snacks', icon: '🍿', categories: ['snacks'] },
  { name: 'Beverages', icon: '🥤', categories: ['beverages'] },
  { name: 'Other', icon: '📦', categories: ['other'] }
];

export const organizeSmartList = (items: GroceryItem[]): StoreSection[] => {
  const sections: StoreSection[] = STORE_SECTIONS_ORDER.map((section, index) => ({
    id: section.name.toLowerCase().replace(/\s+/g, '-'),
    name: section.name,
    icon: section.icon,
    items: [],
    visited: false,
    order: index
  }));

  // Convert and organize items
  items.forEach(item => {
    const smartItem: SmartListItem = {
      id: item.id,
      name: item.name,
      category: item.category_slug || 'other',
      icon: item.icon || getDefaultIcon(item.category_slug || 'other'),
      checked: item.checked,
      quantity: item.quantity || 1,
      priority: calculatePriority(item),
      nutritionScore: calculateNutritionScore(item.name),
      calories: estimateCalories(item.name)
    };

    // Find appropriate section
    const sectionIndex = STORE_SECTIONS_ORDER.findIndex(section =>
      section.categories.includes(item.category_slug || 'other')
    );
    
    const targetSection = sections[sectionIndex] || sections[sections.length - 1];
    targetSection.items.push(smartItem);
  });

  // Sort items within each section by priority
  sections.forEach(section => {
    section.items.sort((a, b) => b.priority - a.priority);
  });

  return sections.filter(section => section.items.length > 0);
};

const getDefaultIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'fruits-vegetables': '🥬',
    'dairy-eggs': '🥛',
    'meat-seafood': '🥩',
    'bakery': '🍞',
    'pantry': '🏺',
    'snacks': '🍿',
    'beverages': '🥤',
    'other': '📦'
  };
  return iconMap[category] || '📦';
};

const calculatePriority = (item: GroceryItem): number => {
  let priority = 50;
  
  const perishableCategories = ['dairy-eggs', 'meat-seafood', 'fruits-vegetables'];
  if (perishableCategories.includes(item.category_slug || '')) {
    priority += 20;
  }
  
  if (item.quantity && item.quantity > 1) {
    priority += item.quantity * 5;
  }
  
  return Math.min(priority, 100);
};

const calculateNutritionScore = (itemName: string): number => {
  const healthyItems = ['apple', 'banana', 'broccoli', 'spinach', 'salmon', 'chicken', 'yogurt'];
  const unhealthyItems = ['candy', 'soda', 'chips', 'cookies', 'ice cream'];
  
  const name = itemName.toLowerCase();
  
  if (healthyItems.some(healthy => name.includes(healthy))) {
    return Math.floor(Math.random() * 20) + 80;
  } else if (unhealthyItems.some(unhealthy => name.includes(unhealthy))) {
    return Math.floor(Math.random() * 30) + 20;
  }
  
  return Math.floor(Math.random() * 40) + 50;
};

const estimateCalories = (itemName: string): number => {
  const calorieMap: { [key: string]: number } = {
    'apple': 95, 'banana': 105, 'bread': 80, 'milk': 150,
    'chicken': 165, 'rice': 130, 'pasta': 220, 'cheese': 110
  };
  
  const name = itemName.toLowerCase();
  const match = Object.keys(calorieMap).find(key => name.includes(key));
  
  return match ? calorieMap[match] : Math.floor(Math.random() * 150) + 50;
};

export const calculateShoppingRoute = (sections: StoreSection[]): string[] => {
  return sections
    .filter(section => section.items.some(item => !item.checked))
    .sort((a, b) => a.order - b.order)
    .map(section => section.id);
};
