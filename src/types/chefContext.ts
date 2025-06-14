
import { Chef, ChefService, Booking, Earnings, Recipe, ChefReview } from '@/types/chef';

export interface ChefContextType {
  isChef: boolean;
  chefProfile: Chef | null;
  setIsChef: (value: boolean) => void;
  updateChefProfile: (profile: Partial<Chef>) => void;
  chefs: Chef[];
  bookings: Booking[];
  earnings: Earnings | null;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  getChefsByService: (service: string) => Chef[];
  becomeChef: (profile: Omit<Chef, 'id' | 'createdAt' | 'rating' | 'totalBookings'>) => void;
  searchChefs: (query: string) => Chef[];
  filterChefsByLocation: (location: string) => Chef[];
  getTopRatedChefs: () => Chef[];
}
