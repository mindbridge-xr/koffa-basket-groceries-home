
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/BottomNav';
import { RecipeDetailDialog } from '@/components/RecipeDetailDialog';
import { SearchSection } from '@/components/smart-cooking/SearchSection';
import { AIGeneratorSection } from '@/components/smart-cooking/AIGeneratorSection';
import { RecipeResultsTab } from '@/components/smart-cooking/RecipeResultsTab';
import { GeneratedRecipeTab } from '@/components/smart-cooking/GeneratedRecipeTab';
import { NutritionTab } from '@/components/smart-cooking/NutritionTab';
import { useApp } from '@/context/AppContext';
import { useMealDB } from '@/hooks/useMealDB';
import { useRecipeGeneration } from '@/hooks/useRecipeGeneration';
import { useNutrition } from '@/hooks/useNutrition';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const SmartCooking: React.FC = () => {
  const navigate = useNavigate();
  const { lists, addItemToList, createList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);
  
  const { 
    searchRecipes, 
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

  useEffect(() => {
    console.log('SmartCooking page loaded');
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

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    searchRecipes(query);
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
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          isLoading={isMealDBLoading}
          onQuickSearch={handleQuickSearch}
        />

        {/* AI Recipe Generation */}
        <AIGeneratorSection
          onGenerateRecipe={handleGenerateRecipe}
          isGenerating={isGenerating}
        />

        {/* Results Tabs */}
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="generated">AI Generated</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="space-y-4">
            <RecipeResultsTab
              recipes={recipes}
              isLoading={isMealDBLoading}
              onViewRecipe={handleViewRecipe}
              onCalculateNutrition={calculateNutrition}
              isCalculating={isCalculating}
            />
          </TabsContent>

          <TabsContent value="generated" className="space-y-4">
            <GeneratedRecipeTab
              generatedRecipe={generatedRecipe}
              isGenerating={isGenerating}
              onAddToShoppingList={handleAddToShoppingList}
            />
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-4">
            <NutritionTab
              nutritionData={nutritionData}
              isCalculating={isCalculating}
            />
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
