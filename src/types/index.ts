
export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  category_slug: string;
  icon?: string;
  checked?: boolean;
  quantity?: number;
  note?: string;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  ownerId: string;
  shared: boolean;
  sharedWith?: string[];
  lastUsed?: Date; // Adding lastUsed field for tracking recent lists
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string; // Adding icon field for category display
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: GroceryItem[];
  imageUrl?: string;
  createdBy: string;
  tags?: string[];
}
