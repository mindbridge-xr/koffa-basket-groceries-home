
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface RecipeGenerationParams {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cookingTime?: string;
  servings?: number;
  cuisine?: string;
}

interface GeneratedRecipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  description: string;
}

export function useRecipeGeneration() {
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRecipe = async (params: RecipeGenerationParams) => {
    setIsGenerating(true);
    
    try {
      // For demo purposes, we'll simulate recipe generation
      // In a real implementation, this would call OpenAI API
      const mockRecipe = await simulateRecipeGeneration(params);
      setGeneratedRecipe(mockRecipe);
      
      toast({
        title: "Recipe generated!",
        description: "Your custom family recipe is ready"
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: "Generation failed",
        description: "Unable to generate recipe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateRecipeGeneration = async (params: RecipeGenerationParams): Promise<GeneratedRecipe> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const availableIngredients = params.ingredients.slice(0, 6);
    
    const recipeTemplates = [
      {
        name: "Family Harmony Bowl",
        baseIngredients: ["rice", "chicken", "vegetables"],
        instructions: [
          "Cook rice according to package directions",
          "Season and cook chicken until golden",
          "Sauté vegetables until tender-crisp",
          "Combine all ingredients in serving bowls",
          "Garnish with fresh herbs and serve"
        ]
      },
      {
        name: "Quick Family Stir-Fry",
        baseIngredients: ["protein", "vegetables", "sauce"],
        instructions: [
          "Heat oil in a large pan or wok",
          "Add protein and cook until almost done",
          "Add harder vegetables first, then softer ones",
          "Stir in sauce and cook until heated through",
          "Serve immediately over rice or noodles"
        ]
      },
      {
        name: "Nutritious Family Casserole",
        baseIngredients: ["protein", "vegetables", "grains"],
        instructions: [
          "Preheat oven to 375°F (190°C)",
          "Layer ingredients in a baking dish",
          "Add sauce or broth to keep moist",
          "Cover and bake for 30-40 minutes",
          "Let rest for 5 minutes before serving"
        ]
      }
    ];
    
    const template = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
    
    return {
      name: template.name,
      ingredients: [
        ...availableIngredients.map(ing => `1 cup ${ing}`),
        "2 tbsp olive oil",
        "Salt and pepper to taste",
        "1 tsp garlic powder",
        "Fresh herbs for garnish"
      ],
      instructions: template.instructions,
      cookingTime: params.cookingTime || "30 minutes",
      servings: params.servings || 4,
      description: `A delicious family recipe made with your available ingredients, perfect for ${params.servings || 4} people.`
    };
  };

  return {
    generatedRecipe,
    isGenerating,
    generateRecipe
  };
}
