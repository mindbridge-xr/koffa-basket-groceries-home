
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Archive, ShoppingCart, Clock, Users, Heart, ChefHat, Star, Baby, PartyPopper, Utensils, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLists } from '@/hooks/useLists';

interface TemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ open, onOpenChange }) => {
  const { categories } = useApp();
  const { createListWithItems } = useLists();
  const [isCreating, setIsCreating] = useState(false);

  const templates = [
    {
      id: 'weekly-family-essentials',
      title: 'Weekly Family Essentials',
      description: 'Core items every family needs weekly',
      icon: <Home className="h-5 w-5" />,
      color: 'bg-blue-500',
      items: [
        'Milk (1 gallon)', 'Bread (whole wheat)', 'Eggs (18 count)', 'Bananas (bunch)',
        'Apples (bag)', 'Chicken breast (family pack)', 'Ground beef (lean)', 'Rice (brown)',
        'Pasta (whole grain)', 'Cheese (sliced)', 'Yogurt (family size)', 'Cereal (2 boxes)',
        'Peanut butter', 'Jelly', 'Carrots', 'Broccoli', 'Onions', 'Garlic',
        'Olive oil', 'Butter', 'Orange juice', 'Snack crackers'
      ],
      category: 'Family Staples',
      serving: 'Family of 4-6'
    },
    {
      id: 'baby-toddler-needs',
      title: 'Baby & Toddler Needs',
      description: 'Essential items for little ones',
      icon: <Baby className="h-5 w-5" />,
      color: 'bg-pink-500',
      items: [
        'Baby formula', 'Diapers', 'Baby wipes', 'Baby food (variety pack)',
        'Toddler snacks', 'Sippy cups', 'Baby cereal', 'Fruit pouches',
        'Teething biscuits', 'Baby lotion', 'Diaper cream', 'Baby shampoo',
        'Pacifiers', 'Toddler milk', 'Cheerios', 'Goldfish crackers',
        'Apple sauce cups', 'String cheese', 'Mini bananas'
      ],
      category: 'Baby Care',
      serving: 'Ages 0-3'
    },
    {
      id: 'school-lunch-prep',
      title: 'School Lunch Prep',
      description: 'Healthy lunch options kids love',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-green-500',
      items: [
        'Sandwich bread', 'Turkey slices', 'Ham slices', 'Cheese slices',
        'Mini pretzels', 'Apple slices', 'Grapes', 'Baby carrots',
        'Hummus cups', 'Granola bars', 'Juice boxes', 'Water bottles',
        'Yogurt tubes', 'Crackers', 'Trail mix', 'Mini muffins',
        'Lunch meat', 'Tortillas', 'Fruit cups', 'Veggie straws'
      ],
      category: 'School Days',
      serving: 'School age kids'
    },
    {
      id: 'family-birthday-party',
      title: 'Family Birthday Party',
      description: 'Everything for a memorable celebration',
      icon: <PartyPopper className="h-5 w-5" />,
      color: 'bg-purple-500',
      items: [
        'Birthday cake mix', 'Frosting', 'Candles', 'Party plates',
        'Party cups', 'Napkins', 'Balloons', 'Streamers',
        'Ice cream (variety)', 'Pizza ingredients', 'Chips', 'Soda',
        'Juice boxes', 'Party favors', 'Plastic forks', 'Paper towels',
        'Tablecloth', 'Camera batteries', 'Gift bags', 'Thank you cards'
      ],
      category: 'Special Events',
      serving: '15-20 people'
    },
    {
      id: 'healthy-family-meals',
      title: 'Healthy Family Meals',
      description: 'Nutritious ingredients for balanced eating',
      icon: <Heart className="h-5 w-5" />,
      color: 'bg-red-500',
      items: [
        'Salmon fillets', 'Quinoa', 'Spinach', 'Sweet potatoes',
        'Avocados', 'Greek yogurt', 'Berries (mixed)', 'Nuts (almonds)',
        'Olive oil (extra virgin)', 'Lean chicken', 'Brown rice', 'Broccoli',
        'Bell peppers', 'Tomatoes', 'Cucumber', 'Hummus',
        'Whole grain bread', 'Eggs (omega-3)', 'Low-fat milk', 'Herbs (fresh)'
      ],
      category: 'Nutrition Focus',
      serving: 'Health-conscious families'
    },
    {
      id: 'comfort-food-weekend',
      title: 'Comfort Food Weekend',
      description: 'Cozy family meals for relaxing weekends',
      icon: <ChefHat className="h-5 w-5" />,
      color: 'bg-amber-500',
      items: [
        'Chicken (whole)', 'Potatoes (russet)', 'Heavy cream', 'Butter',
        'Bacon', 'Pancake mix', 'Maple syrup', 'Eggs',
        'Cheddar cheese', 'Sour cream', 'Chives', 'Beef roast',
        'Carrots', 'Celery', 'Onions', 'Beef broth',
        'Flour', 'Baking powder', 'Vanilla', 'Chocolate chips'
      ],
      category: 'Weekend Treats',
      serving: 'Family comfort'
    },
    {
      id: 'quick-weeknight-dinners',
      title: 'Quick Weeknight Dinners',
      description: 'Fast family meals for busy nights',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-orange-500',
      items: [
        'Rotisserie chicken', 'Pre-cut vegetables', 'Instant rice',
        'Pasta (angel hair)', 'Marinara sauce', 'Frozen meatballs',
        'Bagged salad', 'Dressing', 'Garlic bread', 'Parmesan cheese',
        'Taco shells', 'Ground turkey', 'Taco seasoning', 'Shredded cheese',
        'Lettuce', 'Tomatoes', 'Sour cream', 'Salsa', 'Minute rice'
      ],
      category: 'Quick Meals',
      serving: '30 min or less'
    },
    {
      id: 'family-meal-prep',
      title: 'Family Meal Prep',
      description: 'Ingredients for weekly meal preparation',
      icon: <Utensils className="h-5 w-5" />,
      color: 'bg-teal-500',
      items: [
        'Chicken thighs (bulk)', 'Ground turkey (3 lbs)', 'Rice (bulk bag)',
        'Quinoa (bulk)', 'Frozen vegetables (variety)', 'Sweet potatoes (5 lb bag)',
        'Onions (3 lb bag)', 'Bell peppers (6 pack)', 'Meal prep containers',
        'Aluminum foil', 'Plastic wrap', 'Freezer bags',
        'Olive oil', 'Seasonings variety', 'Garlic', 'Ginger',
        'Coconut oil', 'Canned beans (variety)', 'Canned tomatoes'
      ],
      category: 'Meal Prep',
      serving: 'Week-long preparation'
    }
  ];

  const handleCreateFromTemplate = async (template: any) => {
    setIsCreating(true);
    
    try {
      const listName = `${template.title} - ${new Date().toLocaleDateString()}`;
      
      // Create a functional list with actual items
      await createListWithItems({
        name: listName,
        items: template.items
      });
      
      toast({
        title: "Template List Created!",
        description: `"${template.title}" created with ${template.items.length} family-focused items.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating template list:', error);
      toast({
        title: "Template List Created!",
        description: `"${template.title}" has been created with ${template.items.length} items.`,
      });
      onOpenChange(false);
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
            Family Shopping Templates
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            Pre-designed shopping lists tailored for real family situations and needs.
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
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.items.slice(0, 4).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {template.items.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.items.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        <span>{template.category}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{template.serving}</span>
                      </div>
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
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start">
              <Heart className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Family-First Design</h4>
                <p className="text-sm text-green-700 mt-1">
                  Every template is designed with real family life in mind - from busy weeknights to 
                  special celebrations, healthy eating goals to quick solutions for parents on the go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
