
import React, { createContext, useContext, useState } from 'react';
import { Chef, ChefService, Booking, Earnings } from '@/types/chef';

interface ChefContextType {
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
}

// Mock data for demo
const mockChefs: Chef[] = [
  {
    id: 'chef-1',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    bio: 'Professional chef with 10+ years experience in Italian and Mexican cuisine.',
    specialties: ['Pasta', 'Tacos', 'Desserts'],
    cuisineTypes: ['Italian', 'Mexican'],
    experienceLevel: 'professional',
    rating: 4.8,
    totalBookings: 156,
    isVerified: true,
    hourlyRate: 75,
    location: 'Downtown',
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }
    ],
    services: [
      {
        id: 'service-1',
        name: 'Private Dinner Party',
        description: 'Complete 3-course dinner for up to 8 guests',
        duration: 240,
        price: 300,
        category: 'private-chef',
        maxGuests: 8
      }
    ],
    portfolio: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'chef-2',
    name: 'James Chen',
    email: 'james@example.com',
    bio: 'Culinary school graduate specializing in Asian fusion and healthy meal prep.',
    specialties: ['Stir-fry', 'Sushi', 'Meal Prep'],
    cuisineTypes: ['Asian', 'Fusion'],
    experienceLevel: 'culinary-trained',
    rating: 4.9,
    totalBookings: 89,
    isVerified: true,
    hourlyRate: 65,
    location: 'Midtown',
    availability: [],
    services: [
      {
        id: 'service-2',
        name: 'Weekly Meal Prep',
        description: 'Healthy meal prep for the entire week',
        duration: 180,
        price: 150,
        category: 'meal-prep'
      }
    ],
    portfolio: [],
    createdAt: new Date().toISOString()
  }
];

const mockEarnings: Earnings = {
  totalEarnings: 3450,
  thisMonth: 890,
  thisWeek: 220,
  completedBookings: 23,
  pendingPayouts: 150,
  avgRating: 4.8,
  topService: 'Private Dinner Party'
};

const ChefContext = createContext<ChefContextType | undefined>(undefined);

export const ChefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChef, setIsChef] = useState(false);
  const [chefProfile, setChefProfile] = useState<Chef | null>(null);
  const [chefs] = useState<Chef[]>(mockChefs);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [earnings] = useState<Earnings | null>(mockEarnings);

  const updateChefProfile = (profile: Partial<Chef>) => {
    if (chefProfile) {
      setChefProfile({ ...chefProfile, ...profile });
    }
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    ));
  };

  const getChefsByService = (service: string) => {
    return chefs.filter(chef =>
      chef.services.some(s => s.category === service)
    );
  };

  const becomeChef = (profile: Omit<Chef, 'id' | 'createdAt' | 'rating' | 'totalBookings'>) => {
    const newChefProfile: Chef = {
      ...profile,
      id: Date.now().toString(),
      rating: 0,
      totalBookings: 0,
      createdAt: new Date().toISOString()
    };
    setChefProfile(newChefProfile);
    setIsChef(true);
  };

  return (
    <ChefContext.Provider value={{
      isChef,
      chefProfile,
      setIsChef,
      updateChefProfile,
      chefs,
      bookings,
      earnings,
      createBooking,
      updateBookingStatus,
      getChefsByService,
      becomeChef
    }}>
      {children}
    </ChefContext.Provider>
  );
};

export const useChef = () => {
  const context = useContext(ChefContext);
  if (context === undefined) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};
