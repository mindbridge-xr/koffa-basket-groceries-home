
import React, { useState } from 'react';
import { KoffaLogo } from '@/components/KoffaLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, ShoppingCart, Clock, Users, Zap, Archive } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { QuickShopDialog } from '@/components/QuickShopDialog';
import { TemplatesDialog } from '@/components/TemplatesDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCategories } from '@/hooks/useCategories';
import { useLists } from '@/hooks/useLists';

export const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showQuickShopDialog, setShowQuickShopDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { lists, createList, isLoading: listsLoading } = useLists();
  
  // Filter categories by search term
  const filteredCategories = categories?.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList({ name: newListName.trim() });
      setNewListName('');
      setShowNewListDialog(false);
    }
  };

  // Enhanced activity data
  const recentActivity = [
    { action: 'Added Milk to Weekly Shopping', time: '2 hours ago', icon: '🥛' },
    { action: 'Completed Party Shopping list', time: '1 day ago', icon: '🎉' },
    { action: 'Shared Healthy Meal Prep with family', time: '2 days ago', icon: '👨‍👩‍👧‍👦' },
    { action: 'Created Quick Shopping List', time: '3 days ago', icon: '⚡' }
  ];

  const totalItems = lists?.reduce((acc, list) => acc + list.list_items?.length || 0, 0) || 0;
  const sharedLists = lists?.filter(list => list.shared).length || 0;

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <KoffaLogo className="text-white" size="sm" />
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback className="bg-white/20 text-white">U</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Koffa!</h1>
        <p className="text-white/80 mb-4">Organize your grocery shopping with ease</p>
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
      
      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90 h-16 flex flex-col"
            onClick={handleOpenNewListDialog}
          >
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-sm">New List</span>
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

        {/* Enhanced Quick Actions Row */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 flex items-center justify-center border-koffa-aqua-forest text-koffa-aqua-forest hover:bg-koffa-aqua-forest/10"
            onClick={() => setShowTemplatesDialog(true)}
          >
            <Archive className="h-4 w-4 mr-2" />
            <span className="text-sm">Templates</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-12 flex items-center justify-center border-koffa-aqua-forest text-koffa-aqua-forest hover:bg-koffa-aqua-forest/10"
          >
            <Zap className="h-4 w-4 mr-2" />
            <span className="text-sm">Smart Lists</span>
          </Button>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{lists?.length || 0}</div>
              <div className="text-xs text-muted-foreground">Active Lists</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{totalItems}</div>
              <div className="text-xs text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-koffa-aqua-forest">{sharedLists}</div>
              <div className="text-xs text-muted-foreground">Shared</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Lists */}
        {!listsLoading && lists && lists.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Lists</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-koffa-aqua-forest hover:text-koffa-aqua-forest/80"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {lists.slice(0, 4).map(list => (
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
        )}

        {/* Enhanced Recent Activity */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-0">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 border-b last:border-b-0 flex items-center hover:bg-muted/50 transition-colors">
                  <div className="text-2xl mr-3">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
          {!categoriesLoading && filteredCategories.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : categoriesLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div key={i} className="aspect-square animate-pulse bg-gray-200 rounded-lg" />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No categories found</h3>
                <p className="text-gray-500">
                  {search ? `No categories match "${search}"` : "Categories will appear here once they're loaded"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <FloatingActionButton 
        onClick={() => setShowNewListDialog(true)} 
        label="New List"
        icon={<Plus className="h-5 w-5" />}
      />
      <BottomNav />
      
      {/* Dialogs */}
      <Dialog open={showNewListDialog} onOpenChange={setShowNewListDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries)"
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

export default Dashboard;
