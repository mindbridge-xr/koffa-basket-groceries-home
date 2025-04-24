
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ChevronLeft } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const CategoryItems: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getItemsByCategory, categories, lists, addItemToList } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedList, setSelectedList] = useState<string>('');
  const [quantity, setQuantity] = useState('1');
  const [note, setNote] = useState('');

  const category = categories.find(c => c.slug === slug);
  const items = slug ? getItemsByCategory(slug) : [];
  
  const handleAddItem = (item: any) => {
    setSelectedItem(item);
    setShowAddDialog(true);
  };
  
  const handleConfirmAdd = () => {
    if (selectedItem && selectedList) {
      addItemToList(selectedList, {
        ...selectedItem,
        quantity: parseInt(quantity) || 1,
        note: note
      });
      setSelectedItem(null);
      setSelectedList('');
      setQuantity('1');
      setNote('');
      setShowAddDialog(false);
    }
  };

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
        <h1 className="text-2xl font-bold">{category.name}</h1>
        <p className="text-white/80">{items.length} items</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map(item => (
            <div 
              key={item.id}
              className="bg-white p-3 rounded-lg shadow-sm border border-muted hover:shadow-md transition-shadow flex flex-col items-center cursor-pointer"
              onClick={() => handleAddItem(item)}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-center font-medium">{item.name}</div>
            </div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-600">No items in this category</h3>
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
                {lists.map(list => (
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
