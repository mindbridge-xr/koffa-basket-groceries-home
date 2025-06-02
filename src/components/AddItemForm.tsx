
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { EnhancedItemSearch } from '@/components/EnhancedItemSearch';
import { toast } from '@/hooks/use-toast';

interface AddItemFormProps {
  listId: string;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ listId }) => {
  const { categories, addItemToList } = useApp();
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSelectItem = (item: any) => {
    addItemToList(listId, {
      name: item.name,
      checked: false,
      quantity: item.quantity || 1,
      category_slug: item.category_slug,
      icon: item.icon,
      note: item.note
    });
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to your list.`,
    });
  };

  const handleAddCustomItem = () => {
    if (!itemName) {
      toast({
        title: "Item name required",
        description: "Please enter an item name",
        variant: "destructive"
      });
      return;
    }
    
    const categoryObj = categories.find(c => c.name === category) || categories[0];
    
    addItemToList(listId, {
      name: itemName,
      checked: false,
      quantity: parseInt(quantity) || 1,
      category_slug: categoryObj?.slug,
      icon: categoryObj?.icon || '📦'
    });
    
    toast({
      title: "Custom item added",
      description: `${itemName} has been added to your list.`,
    });
    
    setItemName('');
    setCategory('');
    setQuantity('1');
    setShowAddForm(false);
  };

  return (
    <div className="sticky bottom-20 bg-background p-4 border-t border-muted">
      <div className="space-y-4">
        <EnhancedItemSearch
          onSelectItem={handleSelectItem}
          placeholder="Search and add items..."
        />
        
        <div className="flex justify-center">
          <Popover open={showAddForm} onOpenChange={setShowAddForm}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Item
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Add Custom Item</h4>
                <div className="space-y-2">
                  <Input
                    placeholder="Item name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="flex items-center">
                    <span className="mr-2">Quantity:</span>
                    <Input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <Button onClick={handleAddCustomItem} className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90">
                    Add Item
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
