
import React, { useState } from 'react';
import { KoffaLogo } from '@/components/KoffaLogo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, ShoppingCart, Clock, Users, Zap, Archive, ArrowRight, Star } from 'lucide-react';
import { CategoryCard } from '@/components/CategoryCard';
import { ListCard } from '@/components/ListCard';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { BottomNav } from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { QuickShopDialog } from '@/components/QuickShopDialog';
import { TemplatesDialog } from '@/components/TemplatesDialog';
import { SmartListsDialog } from '@/components/SmartListsDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [showQuickShopDialog, setShowQuickShopDialog] = useState(false);
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false);
  const [showSmartListsDialog, setShowSmartListsDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const { categories, lists, createList } = useApp();
  
  // Filter categories by search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
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

  const totalItems = lists.reduce((acc, list) => acc + list.items.length, 0);
  const sharedLists = lists.filter(list => list.shared).length;

  // Add navigation handler for "View All" button
  const navigate = useNavigate();
  const handleViewAllLists = () => {
    navigate('/lists');
  };

  return (
    <div className="min-h-screen bg-uber-white pb-20">
      {/* Header */}
      <div className="bg-uber-white border-b border-uber-gray-100">
        <div className="section-padding">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-uber-black rounded-lg flex items-center justify-center">
                <span className="text-uber-white font-bold text-sm">K</span>
              </div>
              <div>
                <h1 className="text-uber-2xl font-bold text-uber-black">Good morning</h1>
                <p className="text-uber-sm text-uber-gray-500">Ready to shop?</p>
              </div>
            </div>
            <Avatar className="h-10 w-10 border-2 border-uber-gray-100">
              <AvatarFallback className="bg-uber-gray-100 text-uber-gray-600 font-medium">U</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-uber-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories, lists..."
              className="input-uber pl-12 h-12 text-uber-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="content-padding space-y-8 py-6">
        {/* Quick Actions - Uber style service cards */}
        <div className="space-y-4">
          <h2 className="text-uber-xl font-semibold text-uber-black">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <button 
              className="card-uber-hover text-left p-6 animate-press"
              onClick={() => setShowNewListDialog(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-uber-black rounded-xl flex items-center justify-center">
                    <Plus className="h-6 w-6 text-uber-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-uber-lg text-uber-black">Create New List</h3>
                    <p className="text-uber-sm text-uber-gray-500">Start a fresh shopping list</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-uber-gray-400" />
              </div>
            </button>
            
            <button 
              className="card-uber-hover text-left p-6 animate-press"
              onClick={() => setShowQuickShopDialog(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-uber-green rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-uber-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-uber-lg text-uber-black">Quick Shop</h3>
                    <p className="text-uber-sm text-uber-gray-500">Add common items instantly</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-uber-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="card-uber-hover p-4 animate-press"
            onClick={() => setShowTemplatesDialog(true)}
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-uber-gray-100 rounded-xl flex items-center justify-center mx-auto">
                <Archive className="h-6 w-6 text-uber-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-uber-base text-uber-black">Templates</h3>
                <p className="text-uber-xs text-uber-gray-500">Pre-made lists</p>
              </div>
            </div>
          </button>
          
          <button 
            className="card-uber-hover p-4 animate-press"
            onClick={() => setShowSmartListsDialog(true)}
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-uber-gray-100 rounded-xl flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-uber-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-uber-base text-uber-black">Smart Lists</h3>
                <p className="text-uber-xs text-uber-gray-500">AI suggestions</p>
              </div>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card-uber p-4 text-center">
            <div className="text-uber-2xl font-bold text-uber-black">{lists.length}</div>
            <div className="text-uber-xs text-uber-gray-500 font-medium">Active Lists</div>
          </div>
          <div className="card-uber p-4 text-center">
            <div className="text-uber-2xl font-bold text-uber-black">{totalItems}</div>
            <div className="text-uber-xs text-uber-gray-500 font-medium">Total Items</div>
          </div>
          <div className="card-uber p-4 text-center">
            <div className="text-uber-2xl font-bold text-uber-black">{sharedLists}</div>
            <div className="text-uber-xs text-uber-gray-500 font-medium">Shared</div>
          </div>
        </div>

        {/* Recent Lists */}
        {lists.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-uber-xl font-semibold text-uber-black">Your Lists</h2>
              <button 
                className="text-uber-black font-medium text-uber-sm hover:text-uber-gray-700 transition-colors"
                onClick={handleViewAllLists}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {lists.slice(0, 3).map(list => (
                <div key={list.id} className="card-uber-hover p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-uber-base text-uber-black">{list.name}</h3>
                      <p className="text-uber-sm text-uber-gray-500">{list.items.length} items</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-uber-green rounded-full"></div>
                      <ArrowRight className="h-4 w-4 text-uber-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="space-y-4">
          <h2 className="text-uber-xl font-semibold text-uber-black">Shop by Category</h2>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredCategories.slice(0, 6).map((category) => (
                <div key={category.id} className="card-uber-hover p-4 animate-press">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-uber-gray-50 rounded-xl flex items-center justify-center mx-auto">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-uber-sm text-uber-black">{category.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-uber p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-uber-gray-300" />
              <h3 className="text-uber-lg font-medium text-uber-gray-600 mb-2">No categories found</h3>
              <p className="text-uber-sm text-uber-gray-500">
                {search ? `No categories match "${search}"` : "Categories will appear here once they're loaded"}
              </p>
            </div>
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
        <DialogContent className="card-uber mx-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-uber-xl font-semibold">Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Input
              placeholder="List name (e.g., Weekly Groceries)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="input-uber"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <p className="text-uber-sm text-uber-gray-500">
              Tip: Use descriptive names like "Weekly Groceries" or "Birthday Party Shopping"
            </p>
          </div>
          <DialogFooter className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowNewListDialog(false)}
              className="btn-uber-secondary flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateList}
              disabled={!newListName.trim()}
              className="btn-uber-primary flex-1"
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

      <SmartListsDialog 
        open={showSmartListsDialog} 
        onOpenChange={setShowSmartListsDialog} 
      />
    </div>
  );
};

export default Dashboard;
