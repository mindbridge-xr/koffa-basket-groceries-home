
import { Recipe } from '@/types/chef';

export const mockRecipes: Recipe[] = [
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
