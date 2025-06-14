
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Calculator } from 'lucide-react';

interface Recipe {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  [key: string]: any;
}

interface RecipeResultsTabProps {
  recipes: Recipe[];
  isLoading: boolean;
  onViewRecipe: (recipe: Recipe) => void;
  onCalculateNutrition: (recipe: Recipe) => void;
  isCalculating: boolean;
}

export const RecipeResultsTab: React.FC<RecipeResultsTabProps> = ({
  recipes,
  isLoading,
  onViewRecipe,
  onCalculateNutrition,
  isCalculating
}) => {
  if (recipes.length > 0) {
    return (
      <div className="grid gap-4">
        {recipes.map((recipe, index) => (
          <Card key={index} className="card-familyhub-hover">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold font-poppins">{recipe.strMeal}</h3>
                  <p className="text-sm text-muted-foreground font-inter">
                    {recipe.strCategory} • {recipe.strArea}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => onViewRecipe(recipe)}
                      className="btn-primary"
                    >
                      View Recipe
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCalculateNutrition(recipe)}
                      disabled={isCalculating}
                    >
                      <Calculator className="h-4 w-4 mr-1" />
                      {isCalculating ? 'Calculating...' : 'Nutrition'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card className="card-familyhub">
      <CardContent className="p-8 text-center">
        <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-inter">
          {isLoading ? 'Loading recipes...' : 'Search for recipes or generate custom ones with AI'}
        </p>
      </CardContent>
    </Card>
  );
};
