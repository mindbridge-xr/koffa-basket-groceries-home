
export interface GroceryItem {
  id: string;
  name: string;
  checked: boolean;
  quantity?: number;
  note?: string;
  category_slug?: string;
  icon?: string;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  ownerId: string;
  shared: boolean;
  sharedWith?: string[];
  createdAt?: string;
  lastUsed?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  order: number;
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
