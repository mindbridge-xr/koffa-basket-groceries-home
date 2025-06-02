
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Archive, ShoppingCart, Clock, Users, Heart, ChefHat, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ open, onOpenChange }) => {
  const { createList, addItemToList, categories } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  const templates = [
    {
      id: 'weekly-essentials',
      title: 'Weekly Essentials',
      description: 'Basic items for weekly shopping',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-blue-500',
      items: [
        'Milk', 'Bread', 'Eggs', 'Bananas', 'Chicken Breast', 'Rice', 
        'Pasta', 'Tomatoes', 'Onions', 'Butter', 'Cheese', 'Yogurt'
      ]
    },
    {
      id: 'healthy-meals',
      title: 'Healthy Meals',
      description: 'Nutritious ingredients for balanced meals',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-green-500',
      items: [
        'Salmon', 'Quinoa', 'Spinach', 'Avocado', 'Sweet Potatoes', 
        'Broccoli', 'Greek Yogurt', 'Almonds', 'Blueberries', 'Olive Oil'
      ]
    },
    {
      id: 'family-favorites',
      title: 'Family Favorites',
      description: 'Popular items loved by families',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-purple-500',
      items: [
        'Ground Beef', 'Pizza Dough', 'Mozzarella', 'Spaghetti', 'Marinara Sauce',
        'Ice Cream', 'Cookies', 'Juice Boxes', 'Cereal', 'Peanut Butter'
      ]
    },
    {
      id: 'quick-dinners',
      title: 'Quick Dinners',
      description: 'Fast and easy meal ingredients',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-orange-500',
      items: [
        'Rotisserie Chicken', 'Pre-cut Vegetables', 'Instant Rice', 
        'Canned Beans', 'Tortillas', 'Salad Mix', 'Dressing', 'Frozen Vegetables'
      ]
    },
    {
      id: 'comfort-food',
      title: 'Comfort Food',
      description: 'Cozy and satisfying meal ingredients',
      icon: <ChefHat className="h-5 w-5" />,
      color: 'bg-amber-500',
      items: [
        'Potatoes', 'Heavy Cream', 'Bacon', 'Cheddar Cheese', 'Flour',
        'Butter', 'Beef Stock', 'Carrots', 'Celery', 'Herbs'
      ]
    },
    {
      id: 'pantry-staples',
      title: 'Pantry Staples',
      description: 'Essential non-perishable items',
      icon: <Archive className="h-5 w-5" />,
      color: 'bg-gray-500',
      items: [
        'Canned Tomatoes', 'Olive Oil', 'Salt', 'Black Pepper', 'Garlic',
        'Onions', 'Rice', 'Pasta', 'Flour', 'Sugar', 'Baking Powder', 'Vinegar'
      ]
    }
  ];

  const handleCreateFromTemplate = async (template: any) => {
    setIsCreating(true);
    
    try {
      const listName = `${template.title} - ${new Date().toLocaleDateString()}`;
      createList(listName);
      
      // Simulate creating the list and getting its ID
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Template List Created!",
        description: `"${template.title}" has been created with ${template.items.length} items.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create list from template. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Archive className="h-5 w-5 mr-2 text-koffa-aqua-forest" />
            Shopping List Templates
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            Choose from pre-made shopping list templates to get started quickly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${template.color} text-white mr-3`}>
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{template.items.length} items</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.items.slice(0, 6).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {template.items.length > 6 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.items.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleCreateFromTemplate(template)}
                    disabled={isCreating}
                    className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isCreating ? 'Creating...' : 'Use Template'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Pro Tip</h4>
                <p className="text-sm text-blue-700 mt-1">
                  After creating a list from a template, you can customize it by adding or removing items 
                  to fit your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
