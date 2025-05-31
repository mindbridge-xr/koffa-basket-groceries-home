import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Archive, ShoppingCart, Utensils, Heart, Home, Coffee } from 'lucide-react';
import { useLists } from '@/hooks/useLists';
import { toast } from '@/hooks/use-toast';

interface TemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  category: string;
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Weekly Groceries',
    description: 'Essential items for weekly shopping',
    icon: <ShoppingCart className="h-5 w-5" />,
    items: ['Milk', 'Bread', 'Eggs', 'Butter', 'Fruits', 'Vegetables', 'Meat', 'Rice'],
    category: 'Grocery'
  },
  {
    id: '2',
    name: 'Dinner Party',
    description: 'Everything needed for hosting',
    icon: <Utensils className="h-5 w-5" />,
    items: ['Wine', 'Cheese', 'Crackers', 'Appetizers', 'Main Course', 'Dessert', 'Napkins'],
    category: 'Event'
  },
  {
    id: '3',
    name: 'Healthy Eating',
    description: 'Nutritious and organic items',
    icon: <Heart className="h-5 w-5" />,
    items: ['Organic Vegetables', 'Quinoa', 'Salmon', 'Avocado', 'Nuts', 'Greek Yogurt'],
    category: 'Health'
  },
  {
    id: '4',
    name: 'Household Essentials',
    description: 'Cleaning and maintenance items',
    icon: <Home className="h-5 w-5" />,
    items: ['Toilet Paper', 'Cleaning Supplies', 'Laundry Detergent', 'Trash Bags'],
    category: 'Household'
  },
  {
    id: '5',
    name: 'Coffee Lover',
    description: 'Everything for coffee enthusiasts',
    icon: <Coffee className="h-5 w-5" />,
    items: ['Coffee Beans', 'Milk', 'Sugar', 'Coffee Filters', 'Pastries', 'Cream'],
    category: 'Beverages'
  }
];

export const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ open, onOpenChange }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { createList, isConfigured } = useLists();

  const handleCreateFromTemplate = (template: Template) => {
    createList({ name: template.name });
    console.log('Creating list from template:', template.name, 'with items:', template.items);
    
    if (!isConfigured) {
      toast({
        title: "Demo Mode",
        description: `Template "${template.name}" list created (demo only)`,
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Archive className="h-5 w-5 mr-2" />
            Choose a Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate?.id === template.id ? 'ring-2 ring-koffa-aqua-forest' : ''
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  {template.icon}
                  <span className="ml-2">{template.name}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <Badge variant="outline" className="w-fit">
                  {template.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium mb-2">
                  Items ({template.items.length}):
                </div>
                <div className="text-sm text-muted-foreground">
                  {template.items.slice(0, 4).join(', ')}
                  {template.items.length > 4 && ` +${template.items.length - 4} more`}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedTemplate && (
          <Card className="mt-4 bg-koffa-aqua-forest/5">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Selected Template:</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{selectedTemplate.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedTemplate.items.length} items included
                  </div>
                </div>
                <Button
                  className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  onClick={() => handleCreateFromTemplate(selectedTemplate)}
                >
                  Create List
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
