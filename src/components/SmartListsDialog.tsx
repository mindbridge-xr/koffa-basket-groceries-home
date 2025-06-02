
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Zap, Calendar, TrendingUp, Users, ChefHat, Heart, ShoppingCart, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SmartListsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SmartListsDialog: React.FC<SmartListsDialogProps> = ({ open, onOpenChange }) => {
  const { createList, addItemToList } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  const smartListSuggestions = [
    {
      id: 'weekly-essentials',
      title: 'Weekly Essentials',
      description: 'Based on your shopping patterns',
      icon: <Calendar className="h-5 w-5" />,
      color: 'bg-blue-500',
      items: ['Milk', 'Bread', 'Eggs', 'Bananas', 'Chicken Breast', 'Rice', 'Onions', 'Tomatoes']
    },
    {
      id: 'healthy-meal-prep',
      title: 'Healthy Meal Prep',
      description: 'Nutritious ingredients for the week',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-green-500',
      items: ['Quinoa', 'Salmon', 'Broccoli', 'Sweet Potatoes', 'Greek Yogurt', 'Spinach', 'Almonds', 'Avocado']
    },
    {
      id: 'quick-dinners',
      title: 'Quick Dinners',
      description: 'For busy weeknight meals',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-orange-500',
      items: ['Pasta', 'Ground Turkey', 'Bell Peppers', 'Garlic', 'Olive Oil', 'Parmesan', 'Frozen Vegetables', 'Tomato Sauce']
    },
    {
      id: 'family-favorites',
      title: 'Family Favorites',
      description: 'Popular items in your household',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-500',
      items: ['Pizza Ingredients', 'Ice Cream', 'Snacks', 'Juice Boxes', 'Cereal', 'Peanut Butter', 'Jelly', 'Crackers']
    },
    {
      id: 'trending-recipes',
      title: 'Trending Recipes',
      description: 'Popular ingredients this week',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-pink-500',
      items: ['Coconut Milk', 'Ginger', 'Lime', 'Cilantro', 'Red Curry Paste', 'Jasmine Rice', 'Fish Sauce', 'Thai Basil']
    },
    {
      id: 'comfort-food',
      title: 'Comfort Food',
      description: 'Cozy meal ingredients',
      icon: <ChefHat className="h-5 w-5" />,
      color: 'bg-amber-500',
      items: ['Potatoes', 'Butter', 'Heavy Cream', 'Bacon', 'Cheese', 'Flour', 'Beef Stock', 'Herbs']
    }
  ];

  const handleGenerateList = async (suggestion: any) => {
    setIsGenerating(true);
    
    try {
      // Create the list
      const listName = `${suggestion.title} - ${new Date().toLocaleDateString()}`;
      createList(listName);
      
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Smart List Generated!",
        description: `"${suggestion.title}" has been created with ${suggestion.items.length} items.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate smart list. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-koffa-aqua-forest" />
            Smart Lists
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            AI-powered shopping lists based on your preferences, trends, and seasonal recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smartListSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${suggestion.color} text-white mr-3`}>
                        {suggestion.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{suggestion.items.length} items</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {suggestion.items.slice(0, 6).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {suggestion.items.length > 6 && (
                        <Badge variant="secondary" className="text-xs">
                          +{suggestion.items.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleGenerateList(suggestion)}
                    disabled={isGenerating}
                    className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Create List'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Pro Tip</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Smart lists learn from your shopping history and preferences. The more you use Koffa, 
                  the better our suggestions become!
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
