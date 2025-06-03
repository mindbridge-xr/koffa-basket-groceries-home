
export interface FoodItem {
  name: string;
  icon: string;
  category: string;
  aliases: string[];
  keywords: string[];
}

export const foodItemsDatabase: FoodItem[] = [
  // Fruits & Vegetables
  { name: 'Tomato', icon: '🍅', category: 'fruits-vegetables', aliases: ['tomatoes', 'tom', 'tomat'], keywords: ['red', 'vegetable', 'salad'] },
  { name: 'Banana', icon: '🍌', category: 'fruits-vegetables', aliases: ['bananas', 'ban'], keywords: ['yellow', 'fruit', 'potassium'] },
  { name: 'Apple', icon: '🍎', category: 'fruits-vegetables', aliases: ['apples', 'app'], keywords: ['red', 'fruit', 'crisp'] },
  { name: 'Carrot', icon: '🥕', category: 'fruits-vegetables', aliases: ['carrots', 'carr'], keywords: ['orange', 'vegetable', 'vitamin'] },
  { name: 'Potato', icon: '🥔', category: 'fruits-vegetables', aliases: ['potatoes', 'pot'], keywords: ['starch', 'vegetable'] },
  { name: 'Onion', icon: '🧅', category: 'fruits-vegetables', aliases: ['onions', 'oni'], keywords: ['white', 'vegetable', 'flavor'] },
  { name: 'Lettuce', icon: '🥬', category: 'fruits-vegetables', aliases: ['lett'], keywords: ['green', 'salad', 'leafy'] },
  { name: 'Broccoli', icon: '🥦', category: 'fruits-vegetables', aliases: ['brocc'], keywords: ['green', 'vegetable', 'healthy'] },
  { name: 'Avocado', icon: '🥑', category: 'fruits-vegetables', aliases: ['avoc', 'avo'], keywords: ['green', 'fruit', 'healthy'] },
  { name: 'Lemon', icon: '🍋', category: 'fruits-vegetables', aliases: ['lemons', 'lem'], keywords: ['yellow', 'citrus', 'sour'] },
  
  // Dairy & Eggs
  { name: 'Milk', icon: '🥛', category: 'dairy-eggs', aliases: ['mil'], keywords: ['white', 'dairy', 'calcium'] },
  { name: 'Cheese', icon: '🧀', category: 'dairy-eggs', aliases: ['chees'], keywords: ['dairy', 'yellow', 'protein'] },
  { name: 'Butter', icon: '🧈', category: 'dairy-eggs', aliases: ['butt'], keywords: ['dairy', 'fat', 'cooking'] },
  { name: 'Eggs', icon: '🥚', category: 'dairy-eggs', aliases: ['egg'], keywords: ['protein', 'breakfast', 'white'] },
  { name: 'Yogurt', icon: '🥛', category: 'dairy-eggs', aliases: ['yogu', 'yog'], keywords: ['dairy', 'probiotics', 'healthy'] },
  
  // Meat & Seafood
  { name: 'Chicken Breast', icon: '🍗', category: 'meat-seafood', aliases: ['chicken', 'chick'], keywords: ['protein', 'meat', 'white'] },
  { name: 'Ground Beef', icon: '🥩', category: 'meat-seafood', aliases: ['beef', 'ground'], keywords: ['protein', 'meat', 'red'] },
  { name: 'Salmon', icon: '🐟', category: 'meat-seafood', aliases: ['salm'], keywords: ['fish', 'protein', 'omega'] },
  { name: 'Pork', icon: '🥩', category: 'meat-seafood', aliases: ['por'], keywords: ['meat', 'protein'] },
  { name: 'Shrimp', icon: '🦐', category: 'meat-seafood', aliases: ['shri'], keywords: ['seafood', 'protein'] },
  
  // Pantry
  { name: 'Rice', icon: '🍚', category: 'pantry', aliases: ['ric'], keywords: ['grain', 'carb', 'white'] },
  { name: 'Pasta', icon: '🍝', category: 'pantry', aliases: ['past'], keywords: ['carb', 'italian', 'noodles'] },
  { name: 'Bread', icon: '🍞', category: 'pantry', aliases: ['brea'], keywords: ['carb', 'wheat', 'loaf'] },
  { name: 'Olive Oil', icon: '🫒', category: 'pantry', aliases: ['oil', 'olive'], keywords: ['cooking', 'fat', 'healthy'] },
  { name: 'Salt', icon: '🧂', category: 'pantry', aliases: ['sal'], keywords: ['seasoning', 'flavor'] },
  { name: 'Black Pepper', icon: '🌶️', category: 'pantry', aliases: ['pepper', 'pepp'], keywords: ['spice', 'seasoning'] },
  { name: 'Sugar', icon: '🍬', category: 'pantry', aliases: ['sug'], keywords: ['sweet', 'baking'] },
  { name: 'Flour', icon: '🌾', category: 'pantry', aliases: ['flou'], keywords: ['baking', 'wheat'] },
  
  // Bakery
  { name: 'Croissant', icon: '🥐', category: 'bakery', aliases: ['crois'], keywords: ['pastry', 'french', 'breakfast'] },
  { name: 'Bagel', icon: '🥯', category: 'bakery', aliases: ['bag'], keywords: ['bread', 'breakfast', 'round'] },
  { name: 'Muffin', icon: '🧁', category: 'bakery', aliases: ['muff'], keywords: ['sweet', 'breakfast', 'cake'] },
  
  // Snacks
  { name: 'Chips', icon: '🍟', category: 'snacks', aliases: ['chip'], keywords: ['crispy', 'salty', 'potato'] },
  { name: 'Cookies', icon: '🍪', category: 'snacks', aliases: ['cookie', 'cook'], keywords: ['sweet', 'baked'] },
  { name: 'Nuts', icon: '🥜', category: 'snacks', aliases: ['nut'], keywords: ['protein', 'healthy', 'crunchy'] },
  
  // Beverages
  { name: 'Coffee', icon: '☕', category: 'beverages', aliases: ['coff'], keywords: ['drink', 'caffeine', 'hot'] },
  { name: 'Tea', icon: '🍵', category: 'beverages', aliases: ['te'], keywords: ['drink', 'hot', 'herbal'] },
  { name: 'Orange Juice', icon: '🧃', category: 'beverages', aliases: ['juice', 'orange'], keywords: ['drink', 'vitamin', 'citrus'] },
  { name: 'Water', icon: '💧', category: 'beverages', aliases: ['wat'], keywords: ['drink', 'hydration'] }
];

export const findFoodItem = (searchTerm: string): FoodItem | null => {
  const term = searchTerm.toLowerCase().trim();
  
  // Direct name match
  const directMatch = foodItemsDatabase.find(item => 
    item.name.toLowerCase() === term
  );
  if (directMatch) return directMatch;
  
  // Alias match
  const aliasMatch = foodItemsDatabase.find(item =>
    item.aliases.some(alias => alias.toLowerCase() === term)
  );
  if (aliasMatch) return aliasMatch;
  
  // Partial match in name
  const partialMatch = foodItemsDatabase.find(item =>
    item.name.toLowerCase().includes(term) || 
    item.aliases.some(alias => alias.toLowerCase().includes(term))
  );
  if (partialMatch) return partialMatch;
  
  // Keyword match
  const keywordMatch = foodItemsDatabase.find(item =>
    item.keywords.some(keyword => keyword.toLowerCase().includes(term))
  );
  if (keywordMatch) return keywordMatch;
  
  return null;
};

export const searchFoodItems = (searchTerm: string, limit: number = 8): FoodItem[] => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return [];
  
  const results: FoodItem[] = [];
  
  // Priority 1: Exact name matches
  foodItemsDatabase.forEach(item => {
    if (item.name.toLowerCase() === term) {
      results.push(item);
    }
  });
  
  // Priority 2: Name starts with search term
  foodItemsDatabase.forEach(item => {
    if (!results.includes(item) && item.name.toLowerCase().startsWith(term)) {
      results.push(item);
    }
  });
  
  // Priority 3: Alias matches
  foodItemsDatabase.forEach(item => {
    if (!results.includes(item) && item.aliases.some(alias => alias.toLowerCase().startsWith(term))) {
      results.push(item);
    }
  });
  
  // Priority 4: Contains search term
  foodItemsDatabase.forEach(item => {
    if (!results.includes(item) && (
      item.name.toLowerCase().includes(term) ||
      item.aliases.some(alias => alias.toLowerCase().includes(term))
    )) {
      results.push(item);
    }
  });
  
  return results.slice(0, limit);
};
