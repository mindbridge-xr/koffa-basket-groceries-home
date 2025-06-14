import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chef, ChefService, Booking, Earnings, Recipe, ChefReview } from '@/types/chef';

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
  searchChefs: (query: string) => Chef[];
  filterChefsByLocation: (location: string) => Chef[];
  getTopRatedChefs: () => Chef[];
}

// Enhanced mock recipes with more variety
const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    name: 'Truffle Pasta',
    description: 'Handmade pasta with black truffle and parmesan',
    ingredients: ['Fresh pasta', 'Black truffle', 'Parmesan', 'Butter', 'Cream'],
    cookingTime: 30,
    difficulty: 'medium',
    cuisineType: 'Italian',
    dietaryTags: ['vegetarian'],
    servings: 4,
    mealType: 'dinner'
  },
  {
    id: 'recipe-2',
    name: 'Pan-Seared Salmon',
    description: 'Fresh Atlantic salmon with lemon herb butter',
    ingredients: ['Salmon fillet', 'Lemon', 'Herbs', 'Butter', 'Asparagus'],
    cookingTime: 25,
    difficulty: 'easy',
    cuisineType: 'Mediterranean',
    dietaryTags: ['gluten-free', 'keto'],
    servings: 4,
    mealType: 'dinner'
  },
  {
    id: 'recipe-3',
    name: 'Chocolate Soufflé',
    description: 'Classic French chocolate soufflé with vanilla ice cream',
    ingredients: ['Dark chocolate', 'Eggs', 'Sugar', 'Butter', 'Vanilla'],
    cookingTime: 45,
    difficulty: 'hard',
    cuisineType: 'French',
    dietaryTags: ['vegetarian'],
    servings: 6,
    mealType: 'dessert'
  },
  {
    id: 'recipe-4',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
    ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Kale', 'Tahini'],
    cookingTime: 35,
    difficulty: 'easy',
    cuisineType: 'Mediterranean',
    dietaryTags: ['vegan', 'gluten-free'],
    servings: 2,
    mealType: 'lunch'
  }
];

const mockReviews: ChefReview[] = [
  {
    id: 'review-1',
    clientId: 'client-1',
    clientName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing! Maria created the most delicious Italian feast for our anniversary dinner. Every dish was perfectly prepared and beautifully presented.',
    bookingId: 'booking-1',
    serviceType: 'Private Dinner Party',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'review-2',
    clientId: 'client-2',
    clientName: 'Mike Chen',
    rating: 5,
    comment: 'Outstanding meal prep service! James prepared healthy, delicious meals that lasted the whole week. Highly recommend!',
    bookingId: 'booking-2',
    serviceType: 'Weekly Meal Prep',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'review-3',
    clientId: 'client-3',
    clientName: 'Emily Davis',
    rating: 4,
    comment: 'Great cooking class! Lisa taught us so much about French techniques. The food was delicious.',
    bookingId: 'booking-3',
    serviceType: 'Cooking Class',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Enhanced mock chefs with more diversity
const mockChefs: Chef[] = [
  {
    id: 'chef-1',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    bio: 'Professional chef with 10+ years experience in Italian and Mexican cuisine. Passionate about creating memorable dining experiences with fresh, local ingredients.',
    specialties: ['Pasta', 'Tacos', 'Desserts', 'Wine Pairing'],
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
        description: 'Complete 3-course dinner for up to 8 guests with wine pairing',
        duration: 240,
        price: 300,
        category: 'private-chef',
        maxGuests: 8,
        includesGroceries: false,
        customizable: true
      },
      {
        id: 'service-1b',
        name: 'Cooking Consultation',
        description: 'One-on-one cooking guidance and meal planning session',
        duration: 90,
        price: 120,
        category: 'consultation',
        maxGuests: 2,
        includesGroceries: false,
        customizable: true
      }
    ],
    portfolio: [
      {
        id: 'portfolio-1',
        title: 'Anniversary Dinner for Two',
        description: 'Romantic Italian dinner with handmade pasta and wine pairing',
        tags: ['Italian', 'Romantic', 'Wine Pairing'],
        createdAt: new Date().toISOString(),
        clientTestimonial: 'Perfect evening!',
        eventType: 'Private Dinner'
      }
    ],
    recipes: mockRecipes.slice(0, 2),
    reviews: [mockReviews[0]],
    certifications: ['Culinary Institute of America', 'Food Safety Certified', 'Wine Sommelier Level 1'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'chef-2',
    name: 'James Chen',
    email: 'james@example.com',
    bio: 'Culinary school graduate specializing in Asian fusion and healthy meal prep. Focused on creating nutritious, flavorful meals for busy families.',
    specialties: ['Stir-fry', 'Sushi', 'Meal Prep', 'Healthy Cooking'],
    cuisineTypes: ['Asian', 'Fusion', 'Japanese'],
    experienceLevel: 'culinary-trained',
    rating: 4.9,
    totalBookings: 89,
    isVerified: true,
    hourlyRate: 65,
    location: 'Midtown',
    availability: [
      { dayOfWeek: 0, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 6, startTime: '08:00', endTime: '16:00' }
    ],
    services: [
      {
        id: 'service-2',
        name: 'Weekly Meal Prep',
        description: 'Healthy meal prep for the entire week with macro tracking',
        duration: 180,
        price: 150,
        category: 'meal-prep',
        includesGroceries: true,
        customizable: true
      },
      {
        id: 'service-2b',
        name: 'Sushi Making Class',
        description: 'Learn to make authentic sushi from scratch',
        duration: 120,
        price: 80,
        category: 'cooking-class',
        maxGuests: 6,
        includesGroceries: true,
        customizable: false
      }
    ],
    portfolio: [
      {
        id: 'portfolio-2',
        title: 'Healthy Family Meal Prep',
        description: 'Week-long meal prep focused on balanced nutrition',
        tags: ['Healthy', 'Meal Prep', 'Family'],
        createdAt: new Date().toISOString(),
        eventType: 'Meal Prep'
      }
    ],
    recipes: mockRecipes.slice(1, 3),
    reviews: [mockReviews[1]],
    certifications: ['Nutrition Specialist', 'Asian Cuisine Expert', 'Food Safety Manager'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'chef-3',
    name: 'Lisa Thompson',
    email: 'lisa@example.com',
    bio: 'French-trained chef with expertise in classical techniques and modern plating. Specializes in teaching cooking classes and creating elegant dinner parties.',
    specialties: ['French Cuisine', 'Pastry', 'Plating', 'Technique'],
    cuisineTypes: ['French', 'European'],
    experienceLevel: 'professional',
    rating: 4.7,
    totalBookings: 67,
    isVerified: true,
    hourlyRate: 85,
    location: 'Uptown',
    availability: [
      { dayOfWeek: 2, startTime: '14:00', endTime: '20:00' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '20:00' },
      { dayOfWeek: 6, startTime: '10:00', endTime: '18:00' }
    ],
    services: [
      {
        id: 'service-3',
        name: 'French Cooking Class',
        description: 'Master French techniques with hands-on instruction',
        duration: 150,
        price: 95,
        category: 'cooking-class',
        maxGuests: 4,
        includesGroceries: true,
        customizable: true
      },
      {
        id: 'service-3b',
        name: 'Elegant Dinner Party',
        description: 'Multi-course French-inspired dinner with professional service',
        duration: 300,
        price: 350,
        category: 'private-chef',
        maxGuests: 10,
        includesGroceries: false,
        customizable: true
      }
    ],
    portfolio: [
      {
        id: 'portfolio-3',
        title: 'French Pastry Workshop',
        description: 'Interactive pastry class featuring croissants and éclairs',
        tags: ['French', 'Pastry', 'Workshop'],
        createdAt: new Date().toISOString(),
        clientTestimonial: 'Learned so much!',
        eventType: 'Cooking Class'
      }
    ],
    recipes: [mockRecipes[2], mockRecipes[0]],
    reviews: [mockReviews[2]],
    certifications: ['Le Cordon Bleu Paris', 'Pastry Arts Certificate', 'ServSafe Manager'],
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

  // Initialize chef profile on component mount
  useEffect(() => {
    const storedIsChef = localStorage.getItem('isChef');
    const storedChefProfile = localStorage.getItem('chefProfile');
    
    if (storedIsChef === 'true' && storedChefProfile) {
      try {
        const profile = JSON.parse(storedChefProfile);
        setChefProfile(profile);
        setIsChef(true);
      } catch (error) {
        console.error('Error parsing stored chef profile:', error);
        // If there's an error parsing, initialize with demo profile
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
    localStorage.setItem('isChef', 'true');
    localStorage.setItem('chefProfile', JSON.stringify(demoProfile));
  };

  const updateChefProfile = (profile: Partial<Chef>) => {
    if (chefProfile) {
      const updatedProfile = { ...chefProfile, ...profile };
      setChefProfile(updatedProfile);
      localStorage.setItem('chefProfile', JSON.stringify(updatedProfile));
    }
  };

  const handleSetIsChef = (value: boolean) => {
    setIsChef(value);
    localStorage.setItem('isChef', value.toString());
    if (!value) {
      setChefProfile(null);
      localStorage.removeItem('chefProfile');
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
    localStorage.setItem('isChef', 'true');
    localStorage.setItem('chefProfile', JSON.stringify(newChefProfile));
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
