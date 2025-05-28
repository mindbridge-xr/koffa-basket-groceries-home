
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useLists } from '@/hooks/useLists';

export const Lists: React.FC = () => {
  const { lists, createList, isLoading } = useLists();
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [newListName, setNewListName] = useState('');

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
        <h1 className="text-2xl font-bold mb-2">My Lists</h1>
        <p className="text-white/80">Manage your grocery lists</p>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="grid gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="h-24 animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : lists && lists.length > 0 ? (
          <div className="grid gap-3">
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
        ) : (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-600">No lists yet</h3>
            <p className="text-gray-500 mt-2">
              Create your first grocery list to get started
            </p>
          </div>
        )}
      </div>
      
      <FloatingActionButton onClick={() => setShowNewListDialog(true)} />
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

export default Lists;
