
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useCategories';
import { useItemsByCategory } from '@/hooks/useItems';
import { useLists } from '@/hooks/useLists';

export const CategoryItems: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { lists } = useLists();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedList, setSelectedList] = useState<string>('');
  const [quantity, setQuantity] = useState('1');
  const [note, setNote] = useState('');

  // Find category by slug
  const category = categories?.find(c => c.slug === slug);
  const { items, isLoading: itemsLoading } = useItemsByCategory(category?.id || '');
  
  const handleAddItem = (item: any) => {
    setSelectedItem(item);
    setShowAddDialog(true);
  };
  
  const handleConfirmAdd = () => {
    if (selectedItem && selectedList) {
      // TODO: Implement adding item to list
      console.log('Adding item to list:', { selectedItem, selectedList, quantity, note });
      setSelectedItem(null);
      setSelectedList('');
      setQuantity('1');
      setNote('');
      setShowAddDialog(false);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-koffa-snow-drift flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-koffa-snow-drift flex flex-col items-center justify-center p-4">
        <p className="text-gray-600">Category not found</p>
        <Link to="/" className="text-koffa-aqua-forest hover:underline mt-2">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex items-center mb-4">
          <Link to="/" className="flex items-center text-white/90 hover:text-white">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-4xl mr-3">{category.icon}</span>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        <p className="text-white/80">{items?.length || 0} items</p>
      </div>
      
      <div className="p-4">
        {itemsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map(item => (
              <div 
                key={item.id}
                className="bg-white p-3 rounded-lg shadow-sm border border-muted hover:shadow-md transition-shadow flex flex-col items-center cursor-pointer"
                onClick={() => handleAddItem(item)}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-center font-medium text-sm">{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-600">No items in this category</h3>
            <p className="text-gray-500 mt-2">Items will appear here once they're added to the database</p>
          </div>
        )}
      </div>
      
      <BottomNav />
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to List</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-center text-4xl mb-2">
              {selectedItem?.icon}
            </div>
            <div className="text-center font-medium">{selectedItem?.name}</div>
            
            <div className="space-y-2">
              <label htmlFor="list" className="block text-sm font-medium">
                Select List
              </label>
              <select
                id="list"
                className="w-full p-2 border rounded-md"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                required
              >
                <option value="">Choose a list</option>
                {lists?.map(list => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="note" className="block text-sm font-medium">
                Note (optional)
              </label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="E.g., organic, extra ripe, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleConfirmAdd}
              disabled={!selectedList}
            >
              Add to List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryItems;
