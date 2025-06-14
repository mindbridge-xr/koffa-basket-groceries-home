
export interface HealthMetrics {
  steps: number;
  caloriesBurned: number;
  distanceWalked: number; // in meters
  shoppingDuration: number; // in minutes
  heartRate?: number;
}

export interface ShoppingSession {
  id: string;
  listId: string;
  startTime: Date;
  endTime?: Date;
  healthMetrics: HealthMetrics;
  itemsCompleted: number;
  totalItems: number;
  efficiency: number; // percentage
  route: string[]; // category order visited
}

export interface SmartListItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  checked: boolean;
  quantity: number;
  nutritionScore?: number;
  calories?: number;
  priority: number; // for smart ordering
}

export interface StoreSection {
  id: string;
  name: string;
  icon: string;
  items: SmartListItem[];
  visited: boolean;
  order: number;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface ActivityGoals {
  dailySteps: number;
  weeklyCaloriesBurn: number;
  healthyItemsRatio: number;
}
