
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Heart, ShoppingCart, Zap } from 'lucide-react';

interface GeneratedRecipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  description: string;
}

interface GeneratedRecipeTabProps {
  generatedRecipe: GeneratedRecipe | null;
  isGenerating: boolean;
  onAddToShoppingList: (ingredients: string[]) => void;
}

export const GeneratedRecipeTab: React.FC<GeneratedRecipeTabProps> = ({
  generatedRecipe,
  isGenerating,
  onAddToShoppingList
}) => {
  if (generatedRecipe) {
    return (
      <Card className="card-familyhub">
        <CardHeader>
          <CardTitle className="font-poppins">{generatedRecipe.name}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {generatedRecipe.cookingTime}
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {generatedRecipe.servings} servings
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-inter mt-2">
            {generatedRecipe.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 font-poppins">Ingredients:</h4>
            <div className="space-y-1">
              {generatedRecipe.ingredients.map((ingredient: string, index: number) => (
                <div key={index} className="text-sm font-inter">{ingredient}</div>
              ))}
            </div>
            <Button
              size="sm"
              className="mt-2"
              onClick={() => onAddToShoppingList(generatedRecipe.ingredients)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Shopping List
            </Button>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 font-poppins">Instructions:</h4>
            <div className="space-y-2">
              {generatedRecipe.instructions.map((instruction: string, index: number) => (
                <div key={index} className="text-sm font-inter">
                  <span className="font-medium">{index + 1}.</span> {instruction}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-familyhub">
      <CardContent className="p-8 text-center">
        <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-inter">
          {isGenerating ? 'Generating your custom recipe...' : 'Generate a custom recipe using AI'}
        </p>
      </CardContent>
    </Card>
  );
};
