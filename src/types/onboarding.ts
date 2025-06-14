
import { Chef } from '@/types/chef';

export interface OnboardingFormData {
  // Step 1: Personal Information
  name: string;
  email: string;
  phone: string;
  location: string;
  
  // Step 2: Professional Background
  bio: string;
  experienceLevel: Chef['experienceLevel'];
  yearsExperience: number;
  previousRoles: string;
  
  // Step 3: Specialties & Cuisine
  specialties: string[];
  cuisineTypes: string[];
  dietarySpecializations: string[];
  
  // Step 4: Services & Pricing
  serviceTypes: string[];
  hourlyRate: number;
  travelDistance: number;
  availability: string;
  
  // Step 5: Portfolio & Credentials
  certifications: string[];
  portfolioDescription: string;
  instagramHandle: string;
  
  // Step 6: Final Details
  agreesToTerms: boolean;
  wantsInsurance: boolean;
  hasTransportation: boolean;
}

export const ONBOARDING_CONSTANTS = {
  specialtyOptions: [
    'Pasta Making', 'Pizza', 'Sushi', 'BBQ & Grilling', 'Desserts & Pastry',
    'Bread Baking', 'Meal Prep', 'Diet/Nutrition', 'Wine Pairing', 'Fermentation',
    'Sauce Making', 'Knife Skills', 'Food Photography', 'Catering'
  ],
  
  cuisineOptions: [
    'Italian', 'Asian Fusion', 'Mexican', 'French', 'Mediterranean', 'American',
    'Indian', 'Thai', 'Japanese', 'Chinese', 'Middle Eastern', 'Greek',
    'Spanish', 'Vietnamese', 'Korean', 'Fusion'
  ],
  
  dietaryOptions: [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb',
    'Diabetic-Friendly', 'Heart-Healthy', 'Raw Food', 'Whole30'
  ],
  
  serviceTypeOptions: [
    'Private Chef Service', 'Meal Prep', 'Cooking Classes', 'Dinner Parties',
    'Corporate Catering', 'Special Events', 'Recipe Development', 'Food Consulting'
  ],
  
  certificationOptions: [
    'Culinary Institute Graduate', 'Food Safety Certified', 'ServSafe Manager',
    'Nutrition Specialist', 'Wine Sommelier', 'Pastry Arts Certificate',
    'Organic Cooking Certified', 'Food Handler\'s License'
  ]
};
