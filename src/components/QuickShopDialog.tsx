
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { ShoppingCart, Plus, Clock, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickShopDialog: React.FC<QuickShopDialogProps> = ({ open, onOpenChange }) => {
  const { createList, addItemToList, categories } = useApp();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');

  const quickItems = [
    'Milk', 'Bread', 'Eggs', 'Bananas', 'Chicken', 'Rice', 'Pasta', 'Tomatoes',
    'Onions', 'Butter', 'Cheese', 'Yogurt', 'Apples', 'Potatoes', 'Carrots', 'Beef'
  ];

  const toggleItem = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const addCustomItem = () => {
    if (customItem.trim() && !selectedItems.includes(customItem.trim())) {
      setSelectedItems(prev => [...prev, customItem.trim()]);
      setCustomItem('');
    }
  };

  const handleCreateQuickList = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item for your quick shopping list.",
        variant: "destructive"
      });
      return;
    }

    const listName = `Quick Shopping - ${new Date().toLocaleDateString()}`;
    createList(listName);
    
    // Find the newly created list (it would be the first one since we add to the beginning)
    const newListId = Date.now().toString(); // This matches how we create IDs in context
    
    selectedItems.forEach(itemName => {
      const category = categories.find(c => c.name.toLowerCase().includes(itemName.toLowerCase())) || categories[0];
      addItemToList(newListId, {
        name: itemName,
        checked: false,
        quantity: 1,
        category_slug: category?.slug,
        icon: category?.icon || '🛒'
      });
    });

    toast({
      title: "Quick Shopping List Created!",
      description: `Created "${listName}" with ${selectedItems.length} items.`,
    });

    setSelectedItems([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-koffa-aqua-forest" />
            Quick Shopping List
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground mb-4">
            Select common items to quickly create a shopping list.
          </p>
          
          {/* Custom Item Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom item..."
                value={customItem}
                onChange={(e) => setCustomItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addCustomItem();
                  }
                }}
              />
              <Button 
                onClick={addCustomItem}
                variant="outline"
                disabled={!customItem.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {quickItems.map((item) => (
              <Button
                key={item}
                variant={selectedItems.includes(item) ? "default" : "outline"}
                className={`h-12 text-sm ${
                  selectedItems.includes(item) 
                    ? "bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90" 
                    : "hover:bg-koffa-aqua-forest/10"
                }`}
                onClick={() => toggleItem(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Selected Items ({selectedItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <Badge 
                      key={item} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => toggleItem(item)}
                    >
                      {item} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateQuickList}
              disabled={selectedItems.length === 0}
              className="flex-1 bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Create List ({selectedItems.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
