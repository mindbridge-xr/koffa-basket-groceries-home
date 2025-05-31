import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { QuickShopDialog } from '@/components/QuickShopDialog';
import { TemplatesDialog } from '@/components/TemplatesDialog';
import { Search, Plus, Filter, Archive, Users, Clock, ShoppingCart } from 'lucide-react';
import { useLists } from '@/hooks/useLists';

export const Lists: React.FC = () => {
  const { lists, createList, isLoading, isConfigured } = useLists();
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showQuickShopDialog, setShowQuickShopDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'my' | 'shared'>('all');

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList({ name: newListName.trim() });
      setNewListName('');
      setShowNewListDialog(false);
    }
  };

  // Filter lists based on search term and filter type
  const filteredLists = lists?.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'shared') return matchesSearch && list.shared;
    if (filterType === 'my') return matchesSearch && !list.shared;
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      {!isConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 p-3">
          <div className="text-center text-sm text-amber-800">
            <strong>Demo Mode:</strong> Connect to Supabase to enable full functionality.
            <button className="ml-2 text-amber-900 underline hover:no-underline">
              Learn more
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Lists</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20"
            onClick={() => setShowNewListDialog(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <p className="text-white/80 mb-4">Manage your grocery lists</p>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filterType === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilterType('all')}
            className="text-white hover:bg-white/20"
          >
            All
          </Button>
          <Button
            variant={filterType === 'my' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilterType('my')}
            className="text-white hover:bg-white/20"
          >
            My Lists
          </Button>
          <Button
            variant={filterType === 'shared' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilterType('shared')}
            className="text-white hover:bg-white/20"
          >
            <Users className="h-3 w-3 mr-1" />
            Shared
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{lists?.length || 0}</div>
              <div className="text-xs text-muted-foreground">Total Lists</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">
                {lists?.filter(l => l.shared).length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Shared</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">0</div>
              <div className="text-xs text-muted-foreground">Archived</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90 h-16 flex flex-col"
            onClick={() => setShowNewListDialog(true)}
          >
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-sm">Create List</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col border-koffa-aqua-forest text-koffa-aqua-forest hover:bg-koffa-aqua-forest/10"
            onClick={() => setShowQuickShopDialog(true)}
          >
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-sm">Quick Shop</span>
          </Button>
        </div>

        {/* Templates Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="w-full h-12 border-koffa-aqua-forest text-koffa-aqua-forest hover:bg-koffa-aqua-forest/10"
            onClick={() => setShowTemplatesDialog(true)}
          >
            <Archive className="h-5 w-5 mr-2" />
            <span>Browse Templates</span>
          </Button>
        </div>

        {/* Lists */}
        {isLoading ? (
          <div className="grid gap-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-24 animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : filteredLists.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filterType === 'all' && 'All Lists'}
                {filterType === 'my' && 'My Lists'}
                {filterType === 'shared' && 'Shared Lists'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredLists.length} {filteredLists.length === 1 ? 'list' : 'lists'}
              </span>
            </div>
            <div className="grid gap-3">
              {filteredLists.map(list => (
                <ListCard key={list.id} list={{
                  id: list.id,
                  name: list.name,
                  items: [],
                  ownerId: list.owner_id,
                  shared: list.shared || false,
                  sharedWith: []
                }} />
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {searchTerm ? 'No lists found' : 'No lists yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No lists match "${searchTerm}"`
                  : 'Create your first grocery list to get started'
                }
              </p>
              {!searchTerm && (
                <Button 
                  className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  onClick={() => setShowNewListDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First List
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      <FloatingActionButton onClick={() => setShowNewListDialog(true)} />
      <BottomNav />
      
      {/* New List Dialog */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries, Party Shopping)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <div className="text-sm text-muted-foreground">
              Tip: Use descriptive names like "Weekly Groceries" or "Birthday Party Shopping"
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewListDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
              onClick={handleCreateList}
              disabled={!newListName.trim()}
            >
              Create List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Shop Dialog */}
      <QuickShopDialog 
        open={showQuickShopDialog} 
        onOpenChange={setShowQuickShopDialog} 
      />

      {/* Templates Dialog */}
      <TemplatesDialog 
        open={showTemplatesDialog} 
        onOpenChange={setShowTemplatesDialog} 
      />
    </div>
  );
};

export default Lists;
