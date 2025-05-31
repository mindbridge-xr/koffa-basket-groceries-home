import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { useLists } from '@/hooks/useLists';
import { toast } from '@/hooks/use-toast';

interface QuickShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickShopDialog: React.FC<QuickShopDialogProps> = ({ open, onOpenChange }) => {
  const [items, setItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState('');
  const [listName, setListName] = useState('Quick Shopping List');
  const { createList, isConfigured } = useLists();

  const addItem = () => {
    if (currentItem.trim() && !items.includes(currentItem.trim())) {
      setItems([...items, currentItem.trim()]);
      setCurrentItem('');
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  const handleCreateQuickList = () => {
    if (items.length > 0) {
      createList({ name: listName });
      console.log('Creating quick list with items:', items);
      
      if (!isConfigured) {
        toast({
          title: "Demo Mode",
          description: `Quick list "${listName}" with ${items.length} items created (demo only)`,
        });
      }
      
      setItems([]);
      setListName('Quick Shopping List');
      onOpenChange(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Quick Shop
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="List name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          
          <div className="flex space-x-2">
            <Input
              placeholder="Add item (e.g., milk, bread, eggs)"
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={addItem}
              disabled={!currentItem.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {items.length > 0 && (
            <Card>
              <CardContent className="p-3">
                <div className="text-sm font-medium mb-2">Items ({items.length})</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {item}
                      <button
                        onClick={() => removeItem(item)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <p className="text-sm text-muted-foreground">
            Quickly add common items to create a shopping list
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
            onClick={handleCreateQuickList}
            disabled={items.length === 0}
          >
            Create List ({items.length} items)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
