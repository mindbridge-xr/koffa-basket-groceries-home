
import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GroceryItem } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AddItemFormProps {
  listId: string;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ listId }) => {
  const { getFilteredItems, categories, addItemToList } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GroceryItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setSearchResults(getFilteredItems(searchTerm));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, getFilteredItems]);

  const handleSelectItem = (item: GroceryItem) => {
    addItemToList(listId, item);
    setSearchTerm('');
    setShowResults(false);
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
    
    const categoryObj = categories.find(c => c.name === category) || categories[13]; // Default to Own Items
    
    addItemToList(listId, {
      name: itemName,
      category: categoryObj.name,
      category_slug: categoryObj.slug,
      quantity: parseInt(quantity) || 1,
    });
    
    setItemName('');
    setCategory('');
    setQuantity('1');
    setShowAddForm(false);
  };

  return (
    <div className="sticky bottom-20 bg-background p-4 border-t border-muted">
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover open={showAddForm} onOpenChange={setShowAddForm}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Plus className="h-4 w-4" />
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

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="p-3 border-b border-muted hover:bg-muted/20 cursor-pointer"
                onClick={() => handleSelectItem(item)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.category}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
