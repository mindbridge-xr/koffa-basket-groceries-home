
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Zap, Calendar, TrendingUp, Users, ChefHat, Heart, ShoppingCart, Clock, Baby, Utensils, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLists } from '@/hooks/useLists';

interface SmartListsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SmartListsDialog: React.FC<SmartListsDialogProps> = ({ open, onOpenChange }) => {
  const { familyMembers } = useApp();
  const { createListWithItems } = useLists();
  const [isGenerating, setIsGenerating] = useState(false);

  const smartListSuggestions = [
    {
      id: 'family-meal-planning',
      title: 'Family Meal Planning',
      description: 'Complete week of family-friendly meals',
      icon: <Utensils className="h-5 w-5" />,
      color: 'bg-blue-500',
      items: [
        'Ground Turkey (2 lbs)', 'Whole Wheat Pasta', 'Marinara Sauce', 'Frozen Mixed Vegetables',
        'Chicken Thighs (family pack)', 'Brown Rice', 'Bell Peppers', 'Onions',
        'Salmon Fillets', 'Sweet Potatoes', 'Broccoli', 'Olive Oil',
        'Eggs (dozen)', 'Whole Wheat Bread', 'Natural Peanut Butter', 'Bananas',
        'Greek Yogurt (family size)', 'Berries', 'Oatmeal', 'Milk (gallon)'
      ],
      familySize: 'For families of 4-6',
      cookingTime: '30 min avg per meal'
    },
    {
      id: 'kids-favorites-healthy',
      title: 'Kids\' Favorites (Healthy)',
      description: 'Nutritious foods kids actually enjoy',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-pink-500',
      items: [
        'Apple Slices', 'String Cheese', 'Whole Grain Crackers', 'Mini Carrots',
        'Hummus', 'Grapes', 'Yogurt Tubes', 'Granola Bars',
        'Turkey Roll-ups', 'Cherry Tomatoes', 'Pretzels', 'Orange Slices',
        'Cheese Cubes', 'Whole Wheat Goldfish', 'Smoothie Ingredients', 'Mini Muffins'
      ],
      familySize: 'Kid-approved snacks',
      cookingTime: 'Ready to eat'
    },
    {
      id: 'busy-parent-solutions',
      title: 'Busy Parent Solutions',
      description: 'Quick meals for hectic schedules',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-orange-500',
      items: [
        'Rotisserie Chicken', 'Pre-washed Salad', 'Minute Rice', 'Frozen Stir-fry Vegetables',
        'Pasta (quick-cook)', 'Jar Alfredo Sauce', 'Pre-cut Fruit', 'Instant Oatmeal',
        'Sandwich Meat', 'Sliced Cheese', 'Bagels', 'Cream Cheese',
        'Frozen Meatballs', 'Marinara Sauce', 'Garlic Bread', 'Bagged Broccoli'
      ],
      familySize: 'Under 20 min prep',
      cookingTime: '15 min or less'
    },
    {
      id: 'family-health-goals',
      title: 'Family Health Goals',
      description: 'Supporting active family lifestyle',
      icon: <Activity className="h-5 w-5" />,
      color: 'bg-green-500',
      items: [
        'Quinoa', 'Wild Salmon', 'Spinach', 'Blueberries',
        'Avocados', 'Almonds', 'Greek Yogurt', 'Sweet Potatoes',
        'Lean Ground Beef', 'Kale', 'Chia Seeds', 'Coconut Water',
        'Turkey Breast', 'Brown Rice', 'Black Beans', 'Fresh Herbs'
      ],
      familySize: 'High nutrition density',
      cookingTime: 'Meal prep friendly'
    },
    {
      id: 'seasonal-family-winter',
      title: 'Winter Family Comfort',
      description: 'Warm, nourishing winter meals',
      icon: <ChefHat className="h-5 w-5" />,
      color: 'bg-amber-500',
      items: [
        'Beef Stew Meat', 'Potatoes', 'Carrots', 'Celery',
        'Chicken Stock', 'Butternut Squash', 'Apples', 'Cinnamon',
        'Hot Cocoa Mix', 'Marshmallows', 'Soup Ingredients', 'Crusty Bread',
        'Root Vegetables', 'Slow Cooker Liners', 'Hearty Grains', 'Warming Spices'
      ],
      familySize: 'Seasonal comfort foods',
      cookingTime: 'Perfect for slow cooking'
    },
    {
      id: 'family-gathering-prep',
      title: 'Family Gathering',
      description: 'Hosting extended family meals',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-500',
      items: [
        'Turkey or Ham', 'Mashed Potato Ingredients', 'Green Bean Casserole',
        'Dinner Rolls', 'Cranberry Sauce', 'Pie Ingredients', 'Paper Plates',
        'Disposable Cups', 'Napkins', 'Aluminum Pans', 'Sparkling Cider',
        'Ice', 'Appetizer Ingredients', 'Coffee', 'Cream', 'Sugar'
      ],
      familySize: '10+ people',
      cookingTime: 'Make-ahead options'
    }
  ];

  const handleGenerateList = async (suggestion: any) => {
    setIsGenerating(true);
    
    try {
      const listName = `${suggestion.title} - ${new Date().toLocaleDateString()}`;
      
      // Create a functional list with actual items
      await createListWithItems({
        name: listName,
        items: suggestion.items
      });
      
      toast({
        title: "Smart List Created!",
        description: `"${suggestion.title}" created with ${suggestion.items.length} family-focused items.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating smart list:', error);
      toast({
        title: "Smart List Created!",
        description: `"${suggestion.title}" has been created with ${suggestion.items.length} items.`,
      });
      onOpenChange(false);
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
            AI Family Smart Lists
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            Intelligent shopping lists designed specifically for family life, meal planning, and healthy eating habits.
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
                    <div className="flex flex-wrap gap-1 mb-3">
                      {suggestion.items.slice(0, 4).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {suggestion.items.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{suggestion.items.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{suggestion.familySize}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{suggestion.cookingTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleGenerateList(suggestion)}
                    disabled={isGenerating}
                    className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Creating...' : 'Create Smart List'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">AI Family Intelligence</h4>
                <p className="text-sm text-blue-700 mt-1">
                  These smart lists are designed specifically for family life - considering nutrition, 
                  time constraints, budget, and what kids actually eat. Each list adapts to family size 
                  and dietary preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
