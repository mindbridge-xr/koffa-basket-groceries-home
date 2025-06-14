
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
    console.log('Generating recipe with params:', params);
    setIsGenerating(true);
    
    try {
      // For demo purposes, we'll simulate recipe generation
      // In a real implementation, this would call OpenAI API
      const mockRecipe = await simulateRecipeGeneration(params);
      console.log('Generated recipe:', mockRecipe);
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
    console.log('Simulating recipe generation...');
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const availableIngredients = params.ingredients.filter(ing => ing && ing.trim().length > 0).slice(0, 6);
    console.log('Available ingredients for recipe:', availableIngredients);
    
    const recipeTemplates = [
      {
        name: "Family Harmony Bowl",
        baseIngredients: ["rice", "chicken", "vegetables"],
        instructions: [
          "Cook rice according to package directions in a large pot",
          "Season chicken with salt, pepper, and garlic powder, then cook until golden brown",
          "Sauté vegetables in olive oil until tender-crisp",
          "Combine all ingredients in serving bowls",
          "Garnish with fresh herbs and serve immediately"
        ]
      },
      {
        name: "Quick Family Stir-Fry",
        baseIngredients: ["protein", "vegetables", "sauce"],
        instructions: [
          "Heat 2 tbsp oil in a large pan or wok over high heat",
          "Add protein and cook until almost done (3-4 minutes)",
          "Add harder vegetables first, then softer ones after 2 minutes",
          "Stir in sauce and cook until heated through",
          "Serve immediately over rice or noodles"
        ]
      },
      {
        name: "Nutritious Family Casserole",
        baseIngredients: ["protein", "vegetables", "grains"],
        instructions: [
          "Preheat oven to 375°F (190°C)",
          "Layer ingredients in a greased 9x13 baking dish",
          "Add sauce or broth to keep moist",
          "Cover with foil and bake for 30-40 minutes",
          "Let rest for 5 minutes before serving"
        ]
      },
      {
        name: "Simple Family Pasta",
        baseIngredients: ["pasta", "sauce", "vegetables"],
        instructions: [
          "Cook pasta according to package directions",
          "Heat olive oil in a large pan",
          "Sauté vegetables until tender",
          "Add sauce and simmer for 5 minutes",
          "Toss with cooked pasta and serve"
        ]
      }
    ];
    
    const template = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)];
    
    // Create ingredients list based on available ingredients
    const recipeIngredients = [];
    
    if (availableIngredients.length > 0) {
      availableIngredients.forEach(ing => {
        recipeIngredients.push(`1 cup ${ing.toLowerCase()}`);
      });
    } else {
      // Default ingredients if none provided
      recipeIngredients.push("2 cups mixed vegetables");
      recipeIngredients.push("1 lb protein of choice");
      recipeIngredients.push("1 cup rice or pasta");
    }
    
    // Add common cooking ingredients
    recipeIngredients.push("2 tbsp olive oil");
    recipeIngredients.push("Salt and pepper to taste");
    recipeIngredients.push("1 tsp garlic powder");
    recipeIngredients.push("Fresh herbs for garnish");
    
    return {
      name: template.name,
      ingredients: recipeIngredients,
      instructions: template.instructions,
      cookingTime: params.cookingTime || "30 minutes",
      servings: params.servings || 4,
      description: `A delicious family recipe made with your available ingredients, perfect for ${params.servings || 4} people. This recipe combines ${availableIngredients.length > 0 ? availableIngredients.join(', ') : 'wholesome ingredients'} for a nutritious family meal.`
    };
  };

  return {
    generatedRecipe,
    isGenerating,
    generateRecipe
  };
}
