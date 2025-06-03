
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ShoppingCart, Clock, MapPin, Filter, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-uber-white pb-20">
        <div className="bg-uber-black text-uber-white section-padding">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setSelectedListId(null)}
              className="p-2 hover:bg-uber-gray-800 rounded-xl transition-colors animate-press"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-uber-sm font-medium">Shopping Mode</span>
            </div>
          </div>
          
          <h1 className="text-uber-2xl font-bold mb-2">{selectedList.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-uber-sm text-uber-white/80">{pendingItems.length} items left</span>
            <span className="text-uber-white/40">•</span>
            <span className="text-uber-sm text-uber-white/80">{completedItems.length} completed</span>
          </div>
          
          <div className="mb-6">
            <Progress 
              value={progress} 
              className="h-2 bg-uber-white/20 [&>div]:bg-uber-green" 
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-uber-xs text-uber-white/60">{Math.round(progress)}% complete</span>
              <span className="text-uber-xs text-uber-white/60">
                ~{Math.ceil(pendingItems.length * 1.5)} min left
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant={showCompleted ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className={showCompleted ? "btn-uber-secondary" : "text-uber-white hover:bg-uber-white/10"}
            >
              {showCompleted ? "Hide" : "Show"} Completed
            </Button>
            <Button variant="ghost" size="sm" className="text-uber-white hover:bg-uber-white/10">
              <Filter className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>

        <div className="content-padding space-y-4 py-6">
          {Object.entries(groupedItems).map(([categorySlug, items]: [string, any]) => (
            <div key={categorySlug} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-uber-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">📦</span>
                </div>
                <h3 className="text-uber-lg font-semibold text-uber-black capitalize">
                  {categorySlug.replace('-', ' ')}
                </h3>
                <Badge variant="outline" className="text-uber-xs">
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
            <div className="card-uber p-8 text-center">
              <div className="w-16 h-16 bg-uber-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-uber-green" />
              </div>
              <h3 className="text-uber-xl font-bold text-uber-green mb-2">Shopping Complete!</h3>
              <p className="text-uber-sm text-uber-gray-600 mb-6">
                All items have been checked off your list.
              </p>
              <Button 
                className="btn-uber-primary"
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
    <div className="min-h-screen bg-uber-white pb-20">
      <div className="bg-uber-black text-uber-white section-padding">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-uber-2xl font-bold">Shopping Mode</h1>
          <div className="w-12 h-12 bg-uber-white/10 rounded-xl flex items-center justify-center">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
        <p className="text-uber-sm text-uber-white/80">Select a list to start shopping</p>
      </div>

      <div className="content-padding py-6">
        {activeShoppingLists.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-uber-lg font-semibold text-uber-black">Ready to Shop</h2>
            <div className="space-y-3">
              {activeShoppingLists.map(list => {
                const pendingCount = list.items.filter(item => !item.checked).length;
                const progress = getProgress(list);
                
                return (
                  <button
                    key={list.id} 
                    className="card-uber-hover p-4 animate-press w-full text-left"
                    onClick={() => setSelectedListId(list.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-uber-lg text-uber-black">{list.name}</h3>
                      <Badge className="bg-uber-black text-uber-white">
                        {pendingCount} items
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <div className="flex items-center justify-between text-uber-sm">
                        <span className="text-uber-gray-600">{Math.round(progress)}% complete</span>
                        <div className="flex items-center text-uber-gray-500">
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
          <div className="card-uber p-8 text-center">
            <div className="w-16 h-16 bg-uber-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-uber-gray-400" />
            </div>
            <h3 className="text-uber-xl font-semibold text-uber-black mb-2">No Active Shopping Lists</h3>
            <p className="text-uber-sm text-uber-gray-500 mb-6">
              All your lists are complete! Create a new list or add items to get started.
            </p>
            <Link to="/lists">
              <Button className="btn-uber-primary">
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
