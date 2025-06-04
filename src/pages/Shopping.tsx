
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ShoppingCart, Clock, MapPin, Filter, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GroceryItemCard } from '@/components/GroceryItemCard';

export const Shopping: React.FC = () => {
  const { lists, toggleItemChecked } = useApp();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  // Get active shopping lists (lists with uncompleted items)
  const activeShoppingLists = lists.filter(list => 
    list.items.some(item => !item.checked)
  );

  const selectedList = selectedListId ? lists.find(l => l.id === selectedListId) : null;

  const getProgress = (list: any) => {
    if (list.items.length === 0) return 0;
    const completed = list.items.filter((item: any) => item.checked).length;
    return (completed / list.items.length) * 100;
  };

  const groupItemsByCategory = (items: any[]) => {
    const grouped = items.reduce((acc, item) => {
      const category = item.category_slug || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
    return grouped;
  };

  if (selectedList) {
    const pendingItems = selectedList.items.filter(item => !item.checked);
    const completedItems = selectedList.items.filter(item => item.checked);
    const progress = getProgress(selectedList);
    const groupedItems = groupItemsByCategory(showCompleted ? selectedList.items : pendingItems);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
        <div className="bg-gradient-primary text-white mobile-padding">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setSelectedListId(null)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium font-inter">Shopping Mode</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2 font-poppins">{selectedList.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-white/80 font-inter">{pendingItems.length} items left</span>
            <span className="text-white/40">•</span>
            <span className="text-sm text-white/80 font-inter">{completedItems.length} completed</span>
          </div>
          
          <div className="mb-6">
            <Progress 
              value={progress} 
              className="h-2 bg-white/20 [&>div]:bg-white" 
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-white/60 font-inter">{Math.round(progress)}% complete</span>
              <span className="text-xs text-white/60 font-inter">
                ~{Math.ceil(pendingItems.length * 1.5)} min left
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant={showCompleted ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className={showCompleted ? "bg-white text-primary hover:bg-white/90" : "text-white hover:bg-white/10 border-white/20"}
            >
              {showCompleted ? "Hide" : "Show"} Completed
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border-white/20">
              <Filter className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>

        <div className="mobile-spacing space-y-4 py-6">
          {Object.entries(groupedItems).map(([categorySlug, items]: [string, any]) => (
            <div key={categorySlug} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📦</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground capitalize font-poppins">
                  {categorySlug.replace('-', ' ')}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {items.length}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {items.map((item: any) => (
                  <GroceryItemCard
                    key={item.id}
                    item={item}
                    listId={selectedList.id}
                    showCheckbox={true}
                    showDelete={false}
                  />
                ))}
              </div>
            </div>
          ))}

          {pendingItems.length === 0 && (
            <div className="card-familyhub p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-600 mb-2 font-poppins">Shopping Complete!</h3>
              <p className="text-sm text-muted-foreground mb-6 font-inter">
                All items have been checked off your list.
              </p>
              <Button 
                className="btn-primary"
                onClick={() => setSelectedListId(null)}
              >
                Back to Lists
              </Button>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <div className="bg-gradient-primary text-white mobile-padding">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-poppins">Shopping Mode</h1>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-white/80 font-inter">Select a list to start shopping</p>
      </div>

      <div className="mobile-spacing py-6">
        {activeShoppingLists.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground font-poppins">Ready to Shop</h2>
            <div className="space-y-3">
              {activeShoppingLists.map(list => {
                const pendingCount = list.items.filter(item => !item.checked).length;
                const progress = getProgress(list);
                
                return (
                  <button
                    key={list.id} 
                    className="card-familyhub-hover p-4 active:scale-95 transition-transform w-full text-left"
                    onClick={() => setSelectedListId(list.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-foreground font-poppins">{list.name}</h3>
                      <Badge className="bg-primary text-white">
                        {pendingCount} items
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-inter">{Math.round(progress)}% complete</span>
                        <div className="flex items-center text-muted-foreground font-inter">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>~{Math.ceil(pendingCount * 1.5)} min</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card-familyhub p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">No Active Shopping Lists</h3>
            <p className="text-sm text-muted-foreground mb-6 font-inter">
              All your lists are complete! Create a new list or add items to get started.
            </p>
            <Link to="/lists">
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Go to Lists
              </Button>
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Shopping;
