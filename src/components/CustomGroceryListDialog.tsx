
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useActivity } from '@/context/ActivityContext';
import { toast } from '@/hooks/use-toast';

interface CustomGroceryListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CustomGroceryListDialog: React.FC<CustomGroceryListDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { createList } = useApp();
  const { addActivity } = useActivity();
  const [listName, setListName] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState('');
  const [description, setDescription] = useState('');

  const addItem = () => {
    if (currentItem.trim() && !items.includes(currentItem.trim())) {
      setItems([...items, currentItem.trim()]);
      setCurrentItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCreateList = () => {
    if (!listName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a list name",
        variant: "destructive"
      });
      return;
    }

    // Create the list
    createList(listName.trim());

    // Add activity
    addActivity({
      type: 'list_created',
      title: 'Custom List Created',
      description: `Created "${listName}" with ${items.length} items`,
      icon: '📝'
    });

    toast({
      title: "List Created",
      description: `"${listName}" has been created successfully`,
    });

    // Reset form
    setListName('');
    setItems([]);
    setCurrentItem('');
    setDescription('');
    onOpenChange(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-familyhub mx-4 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold font-poppins">Create Custom Grocery List</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="listName" className="text-sm font-medium font-inter">List Name</Label>
            <Input
              id="listName"
              placeholder="e.g., Weekend BBQ Shopping"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium font-inter">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this shopping list..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 h-20"
            />
          </div>

          <div>
            <Label htmlFor="items" className="text-sm font-medium font-inter">Add Items</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="items"
                placeholder="Enter grocery item..."
                value={currentItem}
                onChange={(e) => setCurrentItem(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={addItem}
                disabled={!currentItem.trim()}
                className="btn-primary px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {items.length > 0 && (
            <div>
              <Label className="text-sm font-medium font-inter">Items ({items.length})</Label>
              <div className="flex flex-wrap gap-2 mt-2 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                {items.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{item}</span>
                    <button
                      onClick={() => removeItem(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="space-x-3 mt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="btn-secondary flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateList}
            disabled={!listName.trim()}
            className="btn-primary flex-1"
          >
            Create List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
