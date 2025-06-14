
export interface ServiceOnboardingData {
  // Step 1: Service Type
  category: 'meal-prep' | 'cooking-class' | 'consultation' | 'private-chef' | '';
  template: string;
  
  // Step 2: Service Details
  name: string;
  description: string;
  duration: number;
  maxGuests: number;
  
  // Step 3: Pricing
  price: number;
  includesGroceries: boolean;
  customizable: boolean;
  groceryBudgetRange: string;
  
  // Step 4: Availability
  availabilityNotes: string;
  advanceBooking: number;
  cancellationPolicy: string;
  
  // Step 5: Review
  isActive: boolean;
}

export const SERVICE_TEMPLATES = {
  'meal-prep': [
    {
      id: 'weekly-meal-prep',
      name: 'Weekly Meal Prep',
      description: 'Prepare 5-7 meals for the week with fresh, healthy ingredients',
      duration: 240,
      maxGuests: 1,
      suggestedPrice: 150
    },
    {
      id: 'family-meal-prep',
      name: 'Family Meal Prep',
      description: 'Large batch cooking for families, 10-14 portions',
      duration: 300,
      maxGuests: 6,
      suggestedPrice: 250
    }
  ],
  'cooking-class': [
    {
      id: 'pasta-making',
      name: 'Fresh Pasta Making Class',
      description: 'Learn to make fresh pasta from scratch with traditional techniques',
      duration: 180,
      maxGuests: 6,
      suggestedPrice: 120
    },
    {
      id: 'knife-skills',
      name: 'Essential Knife Skills',
      description: 'Master fundamental knife techniques for efficient cooking',
      duration: 120,
      maxGuests: 4,
      suggestedPrice: 80
    }
  ],
  'consultation': [
    {
      id: 'menu-planning',
      name: 'Personalized Menu Planning',
      description: 'Custom meal planning based on dietary needs and preferences',
      duration: 60,
      maxGuests: 2,
      suggestedPrice: 75
    },
    {
      id: 'kitchen-setup',
      name: 'Kitchen Organization Consultation',
      description: 'Optimize your kitchen layout and equipment for efficient cooking',
      duration: 90,
      maxGuests: 2,
      suggestedPrice: 100
    }
  ],
  'private-chef': [
    {
      id: 'dinner-party',
      name: 'Intimate Dinner Party',
      description: 'Multi-course dinner experience for special occasions',
      duration: 240,
      maxGuests: 8,
      suggestedPrice: 400
    },
    {
      id: 'date-night',
      name: 'Romantic Date Night',
      description: 'Private chef service for couples with personalized menu',
      duration: 180,
      maxGuests: 2,
      suggestedPrice: 200
    }
  ]
};

export const SERVICE_CATEGORIES = [
  {
    id: 'meal-prep',
    name: 'Meal Prep',
    icon: '🥘',
    description: 'Prepare meals in advance for busy schedules'
  },
  {
    id: 'cooking-class',
    name: 'Cooking Class',
    icon: '👨‍🍳',
    description: 'Teach cooking techniques and recipes'
  },
  {
    id: 'consultation',
    name: 'Consultation',
    icon: '💬',
    description: 'Provide culinary advice and planning'
  },
  {
    id: 'private-chef',
    name: 'Private Chef',
    icon: '🍽️',
    description: 'Full-service private dining experiences'
  }
];
