
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { QuickShopDialog } from '@/components/QuickShopDialog';
import { TemplatesDialog } from '@/components/TemplatesDialog';
import { Search, Plus, Filter, Archive, Users, Clock, ShoppingCart, SortAsc, Grid, List as ListIcon } from 'lucide-react';
import { useLists } from '@/hooks/useLists';
import { toast } from '@/hooks/use-toast';

export const Lists: React.FC = () => {
  const { lists, createList, isLoading, isConfigured } = useLists();
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showQuickShopDialog, setShowQuickShopDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'my' | 'shared' | 'recent'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'items'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList({ name: newListName.trim() });
      setNewListName('');
      setShowNewListDialog(false);
      toast({
        title: "List created",
        description: `"${newListName}" has been created successfully!`,
      });
    }
  };

  // Enhanced filtering and sorting
  const filteredAndSortedLists = lists?.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'shared') return matchesSearch && list.shared;
    if (filterType === 'my') return matchesSearch && !list.shared;
    if (filterType === 'recent') {
      const recent = new Date();
      recent.setDate(recent.getDate() - 7);
      return matchesSearch && new Date(list.last_used || list.created_at) > recent;
    }
    return matchesSearch;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'items':
        return (b.list_items?.length || 0) - (a.list_items?.length || 0);
      case 'date':
      default:
        return new Date(b.last_used || b.created_at).getTime() - new Date(a.last_used || a.created_at).getTime();
    }
  }) || [];

  const recentLists = lists?.slice(0, 3) || [];
  const totalItems = lists?.reduce((acc, list) => acc + (list.list_items?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      {!isConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 p-3">
          <div className="text-center text-sm text-amber-800">
            <strong>Demo Mode:</strong> All data is simulated for demonstration purposes.
          </div>
        </div>
      )}
      
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Lists</h1>
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
              <ListIcon className="h-4 w-4" />
            </Button>
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
        </div>
        <p className="text-white/80 mb-4">Manage your grocery lists</p>
        
        {/* Enhanced Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        {/* Enhanced Filter and Sort Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
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
            <Button
              variant={filterType === 'recent' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType('recent')}
              className="text-white hover:bg-white/20"
            >
              <Clock className="h-3 w-3 mr-1" />
              Recent
            </Button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4 text-white/80" />
          <span className="text-sm text-white/80">Sort by:</span>
          <Button
            variant={sortBy === 'date' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('date')}
            className="text-white hover:bg-white/20 text-xs"
          >
            Date
          </Button>
          <Button
            variant={sortBy === 'name' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('name')}
            className="text-white hover:bg-white/20 text-xs"
          >
            Name
          </Button>
          <Button
            variant={sortBy === 'items' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setSortBy('items')}
            className="text-white hover:bg-white/20 text-xs"
          >
            Items
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Enhanced Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{lists?.length || 0}</div>
              <div className="text-xs text-muted-foreground">Total Lists</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">
                {lists?.filter(l => l.shared).length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Shared</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{totalItems}</div>
              <div className="text-xs text-muted-foreground">Total Items</div>
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

        {/* Recent Lists Quick Access */}
        {recentLists.length > 0 && filterType === 'all' && !searchTerm && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Recent Lists</h3>
              <Badge variant="secondary">{recentLists.length}</Badge>
            </div>
            <div className="grid gap-2">
              {recentLists.map(list => (
                <div key={`recent-${list.id}`} className="p-3 bg-koffa-aqua-forest/5 rounded-lg border border-koffa-aqua-forest/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{list.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {list.list_items?.length || 0} items
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lists */}
        {isLoading ? (
          <div className="grid gap-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-24 animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : filteredAndSortedLists.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filterType === 'all' && 'All Lists'}
                {filterType === 'my' && 'My Lists'}
                {filterType === 'shared' && 'Shared Lists'}
                {filterType === 'recent' && 'Recent Lists'}
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {filteredAndSortedLists.length} {filteredAndSortedLists.length === 1 ? 'list' : 'lists'}
                </Badge>
                {searchTerm && (
                  <Badge variant="secondary">
                    Search: "{searchTerm}"
                  </Badge>
                )}
              </div>
            </div>
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "grid gap-3"}>
              {filteredAndSortedLists.map(list => (
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
      
      {/* Enhanced New List Dialog */}
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

      <QuickShopDialog 
        open={showQuickShopDialog} 
        onOpenChange={setShowQuickShopDialog} 
      />

      <TemplatesDialog 
        open={showTemplatesDialog} 
        onOpenChange={setShowTemplatesDialog} 
      />
    </div>
  );
};

export default Lists;
