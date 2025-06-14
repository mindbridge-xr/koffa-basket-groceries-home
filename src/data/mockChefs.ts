
import { Chef } from '@/types/chef';
import { mockRecipes } from './mockRecipes';
import { mockReviews } from './mockReviews';

export const mockChefs: Chef[] = [
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
