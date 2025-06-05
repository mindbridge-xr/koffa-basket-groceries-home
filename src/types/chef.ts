
export interface Chef {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  specialties: string[];
  cuisineTypes: string[];
  experienceLevel: 'home-cook' | 'professional' | 'culinary-trained';
  rating: number;
  totalBookings: number;
  isVerified: boolean;
  hourlyRate: number;
  location: string;
  availability: ChefAvailability[];
  services: ChefService[];
  portfolio: ChefPortfolioItem[];
  recipes: Recipe[];
  reviews: ChefReview[];
  certifications: string[];
  createdAt: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisineType: string;
  dietaryTags: string[];
  imageUrl?: string;
  chefNotes?: string;
  servings: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';
}

export interface ChefReview {
  id: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  bookingId: string;
  serviceType: string;
  createdAt: string;
  images?: string[];
}

export interface ChefService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'meal-prep' | 'cooking-class' | 'consultation' | 'private-chef';
  maxGuests?: number;
  includesGroceries?: boolean;
  customizable?: boolean;
}

export interface ChefAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface ChefPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
  clientTestimonial?: string;
  eventType?: string;
}

export interface BookingRequest {
  id: string;
  chefId: string;
  clientId: string;
  serviceId: string;
  eventType: 'breakfast' | 'lunch' | 'dinner' | 'meal-prep' | 'cooking-class' | 'private-event';
  date: string;
  time: string;
  duration: number;
  guestCount: number;
  selectedRecipes: Recipe[];
  groceryHandling: 'chef-buys' | 'client-buys' | 'family-shops' | 'delivery';
  specialRequests: string;
  dietaryRestrictions: string[];
  totalPrice: number;
  groceryBudget?: number;
  status: 'pending' | 'chef-accepted' | 'chef-declined' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  groceryListId?: string;
}

export interface Booking {
  id: string;
  chefId: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  bookingRequest?: BookingRequest;
}

export interface Earnings {
  totalEarnings: number;
  thisMonth: number;
  thisWeek: number;
  completedBookings: number;
  pendingPayouts: number;
  avgRating: number;
  topService: string;
}
