
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Globe, ShoppingCart, Calculator } from 'lucide-react';

interface RecipeDetailDialogProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToShoppingList: (ingredients: string[]) => void;
  onCalculateNutrition: (recipe: any) => void;
  isCalculatingNutrition: boolean;
}

export const RecipeDetailDialog: React.FC<RecipeDetailDialogProps> = ({
  recipe,
  isOpen,
  onClose,
  onAddToShoppingList,
  onCalculateNutrition,
  isCalculatingNutrition
}) => {
  if (!recipe) return null;

  // Extract ingredients with measurements from MealDB format
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  const handleAddToShoppingList = () => {
    onAddToShoppingList(ingredients);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-8 h-8 rounded object-cover"
            />
            <span>{recipe.strMeal}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Image */}
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Recipe Info */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              {recipe.strArea}
            </Badge>
            <Badge variant="outline" className="flex items-center">
              {recipe.strCategory}
            </Badge>
            {recipe.strTags && (
              <div className="flex flex-wrap gap-1">
                {recipe.strTags.split(',').map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddToShoppingList}
                className="flex items-center"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to List
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
            <Button
              onClick={() => onCalculateNutrition(recipe)}
              disabled={isCalculatingNutrition}
              className="flex items-center justify-center"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {isCalculatingNutrition ? 'Calculating...' : 'Calculate Nutrition'}
            </Button>
            
            {recipe.strYoutube && (
              <Button
                variant="outline"
                onClick={() => window.open(recipe.strYoutube, '_blank')}
                className="flex items-center justify-center"
              >
                Watch Video
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
