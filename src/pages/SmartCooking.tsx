
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/BottomNav';
import { RecipeDetailDialog } from '@/components/RecipeDetailDialog';
import { useApp } from '@/context/AppContext';
import { useMealDB } from '@/hooks/useMealDB';
import { useRecipeGeneration } from '@/hooks/useRecipeGeneration';
import { useNutrition } from '@/hooks/useNutrition';
import { ArrowLeft, Search, ChefHat, Zap, Heart, Calculator, ShoppingCart, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const SmartCooking: React.FC = () => {
  const navigate = useNavigate();
  const { lists, addItemToList, createList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);
  
  const { 
    searchRecipes, 
    getRecipesByIngredients, 
    getRandomRecipe,
    recipes, 
    isLoading: isMealDBLoading 
  } = useMealDB();
  
  const { 
    generateRecipe, 
    generatedRecipe, 
    isGenerating 
  } = useRecipeGeneration();
  
  const { 
    calculateNutrition, 
    nutritionData, 
    isCalculating 
  } = useNutrition();

  // Load some initial content when the page loads
  useEffect(() => {
    console.log('SmartCooking page loaded');
    // Load a random recipe on initial page load
    if (recipes.length === 0) {
      getRandomRecipe();
    }
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      await searchRecipes(searchQuery);
    } else {
      toast({
        title: "Search query required",
        description: "Please enter a recipe name or ingredient to search"
      });
    }
  };

  const handleGenerateRecipe = async () => {
    console.log('Generating recipe...');
    const availableIngredients = lists.flatMap(list => 
      list.items.filter(item => !item.checked).map(item => item.name)
    );
    
    console.log('Available ingredients from lists:', availableIngredients);
    
    await generateRecipe({
      ingredients: availableIngredients.length > 0 ? availableIngredients.slice(0, 10) : ['chicken', 'rice', 'vegetables'],
      dietaryRestrictions: ['family-friendly'],
      cookingTime: '30 minutes',
      servings: 4
    });
  };

  const handleViewRecipe = (recipe: any) => {
    console.log('Viewing recipe:', recipe.strMeal);
    setSelectedRecipe(recipe);
    setIsRecipeDialogOpen(true);
  };

  const handleAddToShoppingList = (ingredients: string[]) => {
    console.log('Adding ingredients to shopping list:', ingredients);
    
    if (lists.length === 0) {
      createList('Recipe Ingredients');
      toast({
        title: "New list created",
        description: "Created 'Recipe Ingredients' list for your recipe items"
      });
    }
    
    const targetList = lists[0];
    ingredients.forEach(ingredient => {
      addItemToList(targetList.id, {
        name: ingredient,
        checked: false
      });
    });
    
    toast({
      title: "Ingredients added",
      description: `Added ${ingredients.length} ingredients to your shopping list`
    });
  };

  const quickSuggestions = [
    { label: 'Family Dinner', query: 'chicken family' },
    { label: 'Quick Breakfast', query: 'quick breakfast' },
    { label: 'Healthy Lunch', query: 'healthy lunch' },
    { label: 'Kid-Friendly', query: 'easy kids' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="mobile-padding">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-lg font-poppins">Smart Cooking</h1>
                <p className="text-xs text-muted-foreground font-inter">AI-powered family recipes</p>
              </div>
            </div>
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="mobile-spacing space-y-6">
        {/* Search Section */}
        <Card className="card-familyhub">
          <CardHeader>
            <CardTitle className="flex items-center font-poppins">
              <Search className="h-5 w-5 mr-2" />
              Recipe Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search recipes by ingredient or dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="input-familyhub"
              />
              <Button 
                onClick={handleSearch}
                disabled={isMealDBLoading}
                className="btn-primary"
              >
                {isMealDBLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(suggestion.query);
                    searchRecipes(suggestion.query);
                  }}
                  className="text-xs"
                >
                  {suggestion.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recipe Generation */}
        <Card className="card-familyhub">
          <CardHeader>
            <CardTitle className="flex items-center font-poppins">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              AI Recipe Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 font-inter">
              Generate custom recipes using ingredients from your shopping lists
            </p>
            <Button
              onClick={handleGenerateRecipe}
              disabled={isGenerating}
              className="w-full btn-primary"
            >
              {isGenerating ? 'Generating Recipe...' : 'Generate Family Recipe'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="generated">AI Generated</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="space-y-4">
            {recipes.length > 0 ? (
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
                              onClick={() => handleViewRecipe(recipe)}
                              className="btn-primary"
                            >
                              View Recipe
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => calculateNutrition(recipe)}
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
            ) : (
              <Card className="card-familyhub">
                <CardContent className="p-8 text-center">
                  <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-inter">
                    {isMealDBLoading ? 'Loading recipes...' : 'Search for recipes or generate custom ones with AI'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="generated" className="space-y-4">
            {generatedRecipe ? (
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
                      onClick={() => handleAddToShoppingList(generatedRecipe.ingredients)}
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
            ) : (
              <Card className="card-familyhub">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-inter">
                    {isGenerating ? 'Generating your custom recipe...' : 'Generate a custom recipe using AI'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            {nutritionData ? (
              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Nutrition Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-inter">Calories:</span>
                        <span className="font-semibold">{nutritionData.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-inter">Protein:</span>
                        <span className="font-semibold">{nutritionData.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-inter">Carbs:</span>
                        <span className="font-semibold">{nutritionData.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-inter">Fat:</span>
                        <span className="font-semibold">{nutritionData.fat}g</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-inter">Fiber:</span>
                        <span className="font-semibold">{nutritionData.fiber}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-inter">Sugar:</span>
                        <span className="font-semibold">{nutritionData.sugar}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-inter">Sodium:</span>
                        <span className="font-semibold">{nutritionData.sodium}mg</span>
                      </div>
                    </div>
                  </div>
                  
                  {nutritionData.healthScore && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-800 font-inter">Health Score:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {nutritionData.healthScore}/100
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700 mt-1 font-inter">
                        {nutritionData.healthScore >= 80 ? 'Excellent choice for family nutrition!' :
                         nutritionData.healthScore >= 60 ? 'Good nutritional balance' :
                         'Consider healthier alternatives'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="card-familyhub">
                <CardContent className="p-8 text-center">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-inter">
                    {isCalculating ? 'Calculating nutrition information...' : 'Select a recipe to view nutrition information'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Recipe Detail Dialog */}
      <RecipeDetailDialog
        recipe={selectedRecipe}
        isOpen={isRecipeDialogOpen}
        onClose={() => setIsRecipeDialogOpen(false)}
        onAddToShoppingList={handleAddToShoppingList}
        onCalculateNutrition={calculateNutrition}
        isCalculatingNutrition={isCalculating}
      />

      <BottomNav />
    </div>
  );
};

export default SmartCooking;
