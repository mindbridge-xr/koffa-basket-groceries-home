
import React, { useState } from 'react';
import { KoffaLogo } from '@/components/KoffaLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCategories } from '@/hooks/useCategories';
import { useLists } from '@/hooks/useLists';

export const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { lists, createList, isLoading: listsLoading } = useLists();
  
  // Filter categories by search term
  const filteredCategories = categories?.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const handleOpenNewListDialog = () => {
    setShowNewListDialog(true);
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList({ name: newListName.trim() });
      setNewListName('');
      setShowNewListDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <KoffaLogo className="text-white" size="sm" />
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-2xl font-bold mb-4">Welcome to Koffa!</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search categories..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4">
        {!listsLoading && lists && lists.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Lists</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-koffa-aqua-forest hover:text-koffa-aqua-forest/80"
                onClick={handleOpenNewListDialog}
              >
                <Plus className="h-4 w-4 mr-1" /> New List
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lists.map(list => (
                <ListCard key={list.id} list={{
                  id: list.id,
                  name: list.name,
                  items: [],
                  shared: list.shared || false,
                  sharedWith: []
                }} />
              ))}
            </div>
          </div>
        )}
        
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {!categoriesLoading && filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : categoriesLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-600">No categories found</h3>
            <p className="text-gray-500 mt-2">
              Categories will appear here once they're added to your database
            </p>
          </div>
        )}
      </div>
      
      <FloatingActionButton 
        onClick={handleOpenNewListDialog} 
        label="New List"
        icon={<Plus className="h-5 w-5" />}
      />
      <BottomNav />
      
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="mb-4"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleCreateList}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
