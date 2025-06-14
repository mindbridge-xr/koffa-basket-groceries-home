
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chef, Booking } from '@/types/chef';
import { ChefContextType } from '@/types/chefContext';
import { mockChefs } from '@/data/mockChefs';
import { mockEarnings } from '@/data/mockEarnings';
import { useChefStorage } from '@/hooks/useChefStorage';

const ChefContext = createContext<ChefContextType | undefined>(undefined);

export const ChefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isChef, setIsChef] = useState(false);
  const [chefProfile, setChefProfile] = useState<Chef | null>(null);
  const [chefs] = useState<Chef[]>(mockChefs);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [earnings] = useState(mockEarnings);
  const { getStoredChefData, saveChefData } = useChefStorage();

  // Initialize chef profile on component mount
  useEffect(() => {
    const { isChef: storedIsChef, chefProfile: storedProfile } = getStoredChefData();
    
    if (storedIsChef && storedProfile) {
      try {
        setChefProfile(storedProfile);
        setIsChef(true);
      } catch (error) {
        console.error('Error parsing stored chef profile:', error);
        initializeDemoProfile();
      }
    } else {
      // For demo purposes, automatically initialize with the first mock chef profile
      initializeDemoProfile();
    }
  }, []);

  const initializeDemoProfile = () => {
    const demoProfile = mockChefs[0]; // Use Maria Rodriguez as demo profile
    setChefProfile(demoProfile);
    setIsChef(true);
    saveChefData(true, demoProfile);
  };

  const updateChefProfile = (profile: Partial<Chef>) => {
    if (chefProfile) {
      const updatedProfile = { ...chefProfile, ...profile };
      setChefProfile(updatedProfile);
      saveChefData(true, updatedProfile);
    }
  };

  const handleSetIsChef = (value: boolean) => {
    setIsChef(value);
    saveChefData(value, value ? chefProfile : null);
    if (!value) {
      setChefProfile(null);
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

  const searchChefs = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return chefs.filter(chef =>
      chef.name.toLowerCase().includes(lowercaseQuery) ||
      chef.specialties.some(s => s.toLowerCase().includes(lowercaseQuery)) ||
      chef.cuisineTypes.some(c => c.toLowerCase().includes(lowercaseQuery)) ||
      chef.bio.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterChefsByLocation = (location: string) => {
    return chefs.filter(chef => chef.location === location);
  };

  const getTopRatedChefs = () => {
    return [...chefs].sort((a, b) => b.rating - a.rating).slice(0, 5);
  };

  const becomeChef = (profile: Omit<Chef, 'id' | 'createdAt' | 'rating' | 'totalBookings'>) => {
    const newChefProfile: Chef = {
      ...profile,
      id: Date.now().toString(),
      rating: 0,
      totalBookings: 0,
      reviews: [],
      recipes: [],
      createdAt: new Date().toISOString()
    };
    setChefProfile(newChefProfile);
    setIsChef(true);
    saveChefData(true, newChefProfile);
  };

  return (
    <ChefContext.Provider value={{
      isChef,
      chefProfile,
      setIsChef: handleSetIsChef,
      updateChefProfile,
      chefs,
      bookings,
      earnings,
      createBooking,
      updateBookingStatus,
      getChefsByService,
      becomeChef,
      searchChefs,
      filterChefsByLocation,
      getTopRatedChefs
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
