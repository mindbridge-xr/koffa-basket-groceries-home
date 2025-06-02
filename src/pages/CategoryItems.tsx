
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Search, Grid, List, ShoppingCart } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/hooks/useCategories';
import { useItemsByCategory } from '@/hooks/useItems';
import { useLists } from '@/hooks/useLists';
import { toast } from '@/hooks/use-toast';

export const CategoryItems: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { lists } = useLists();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedList, setSelectedList] = useState<string>('');
  const [quantity, setQuantity] = useState('1');
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Find category by slug
  const category = categories?.find(c => c.slug === slug);
  const { items, isLoading: itemsLoading } = useItemsByCategory(category?.id || '');
  
  // Filter items by search term
  const filteredItems = items?.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const handleAddItem = (item: any) => {
    setSelectedItem(item);
    if (lists && lists.length > 0) {
      setSelectedList(lists[0].id); // Pre-select first list
    }
    setShowAddDialog(true);
  };
  
  const handleConfirmAdd = () => {
    if (selectedItem && selectedList) {
      // Simulate adding item to list
      console.log('Adding item to list:', { selectedItem, selectedList, quantity, note });
      toast({
        title: "Item added",
        description: `${selectedItem.name} added to your list successfully!`,
      });
      
      // Reset form
      setSelectedItem(null);
      setSelectedList('');
      setQuantity('1');
      setNote('');
      setShowAddDialog(false);
    }
  };

  const handleCreateNewList = () => {
    setShowAddDialog(false);
    navigate('/lists');
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
        <div className="text-6xl mb-4">❓</div>
        <h2 className="text-xl font-bold mb-2">Category not found</h2>
        <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
        <Link to="/" className="text-koffa-aqua-forest hover:underline">
          <Button className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90">
            Go back home
          </Button>
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-3">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-white/80">{filteredItems.length} items available</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="text-white hover:bg-white/20"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-white hover:bg-white/20"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      </div>
      
      <div className="p-4">
        {/* Quick Add to Lists */}
        {lists && lists.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick add to recent lists
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {lists.slice(0, 3).map(list => (
                <Badge 
                  key={list.id}
                  variant="outline" 
                  className="whitespace-nowrap cursor-pointer hover:bg-koffa-aqua-forest hover:text-white transition-colors"
                  onClick={() => {
                    setSelectedList(list.id);
                    if (selectedItem) {
                      handleConfirmAdd();
                    }
                  }}
                >
                  {list.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {itemsLoading ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 gap-3" : "space-y-3"}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={viewMode === 'grid' ? "aspect-square animate-pulse bg-gray-200 rounded-lg" : "h-16 animate-pulse bg-gray-200 rounded-lg"} />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 gap-3" : "space-y-3"}>
            {filteredItems.map(item => (
              viewMode === 'grid' ? (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-all hover:scale-105"
                  onClick={() => handleAddItem(item)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">Tap to add</div>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleAddItem(item)}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="text-3xl mr-4">{item.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Tap to add to list</div>
                    </div>
                    <Plus className="h-5 w-5 text-koffa-aqua-forest" />
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm ? 'No items found' : 'No items in this category'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No items match "${searchTerm}" in ${category.name}`
                  : `Items will appear here once they're added to the ${category.name} category`
                }
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      <FloatingActionButton 
        onClick={() => handleAddItem({ name: 'Custom Item', icon: '📦' })} 
        label="Add Custom"
        icon={<Plus className="h-5 w-5" />}
      />
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
                Select List *
              </label>
              <select
                id="list"
                className="w-full p-2 border rounded-md bg-background"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                required
              >
                <option value="">Choose a list</option>
                {lists?.map(list => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>
              {lists?.length === 0 && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>No lists available. Create a list first.</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCreateNewList}
                    className="w-full"
                  >
                    Create New List
                  </Button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Quick Amount
                </label>
                <div className="flex gap-1">
                  {['1', '2', '5'].map(qty => (
                    <Button
                      key={qty}
                      variant={quantity === qty ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQuantity(qty)}
                      className="flex-1"
                    >
                      {qty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="note" className="block text-sm font-medium">
                Note (optional)
              </label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="E.g., organic, extra ripe, brand preference..."
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
              disabled={!selectedList || !lists?.length}
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
