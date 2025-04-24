
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
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
