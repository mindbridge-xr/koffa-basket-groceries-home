
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
}

export function useMealDB() {
  const [recipes, setRecipes] = useState<MealDBRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchRecipes = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        toast({
          title: "No recipes found",
          description: "Try searching with different keywords"
        });
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast({
        title: "Search failed",
        description: "Unable to fetch recipes. Please try again.",
        variant: "destructive"
      });
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipesByIngredients = async (ingredients: string[]) => {
    setIsLoading(true);
    try {
      // MealDB doesn't have direct ingredient search, so we'll search for each ingredient
      const mainIngredient = ingredients[0];
      if (mainIngredient) {
        await searchRecipes(mainIngredient);
      }
    } catch (error) {
      console.error('Error fetching recipes by ingredients:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipeDetails = async (recipeId: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  };

  const getRandomRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      }
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recipes,
    isLoading,
    searchRecipes,
    getRecipesByIngredients,
    getRecipeDetails,
    getRandomRecipe
  };
}
