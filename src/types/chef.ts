
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
  createdAt: string;
}

export interface ChefService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: 'meal-prep' | 'cooking-class' | 'consultation' | 'private-chef';
  maxGuests?: number;
}

export interface ChefAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface ChefPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
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
