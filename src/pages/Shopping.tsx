
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ShoppingCart, Clock, MapPin, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Shopping: React.FC = () => {
  const { lists, toggleItemChecked } = useApp();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sortBy, setSortBy] = useState<'category' | 'alphabetical' | 'store'>('category');

  // Get active shopping lists (lists with uncompleted items)
  const activeShoppingLists = lists.filter(list => 
    list.items.some(item => !item.checked)
  );

  const selectedList = selectedListId ? lists.find(l => l.id === selectedListId) : null;

  const handleItemToggle = (listId: string, itemId: string) => {
    toggleItemChecked(listId, itemId);
  };

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
      <div className="min-h-screen bg-koffa-snow-drift pb-20">
        <div className="bg-koffa-aqua-forest text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              className="text-white"
              onClick={() => setSelectedListId(null)}
            >
              ← Back to Lists
            </Button>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Store Mode</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{selectedList.name}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm">{pendingItems.length} items left</span>
            <span className="text-sm">•</span>
            <span className="text-sm">{completedItems.length} completed</span>
          </div>
          
          <Progress value={progress} className="mb-4 bg-white/20" />
          
          <div className="flex space-x-2">
            <Button
              variant={showCompleted ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className="text-white"
            >
              {showCompleted ? "Hide" : "Show"} Completed
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Filter className="h-4 w-4 mr-1" />
              Sort
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {Object.entries(groupedItems).map(([categorySlug, items]: [string, any]) => (
            <Card key={categorySlug}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg capitalize">
                  {categorySlug.replace('-', ' ')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className={`flex items-center p-3 rounded-lg border transition-colors ${
                        item.checked 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-koffa-aqua-forest'
                      }`}
                      onClick={() => handleItemToggle(selectedList.id, item.id)}
                    >
                      <div className="mr-3">
                        {item.checked ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                          {item.icon} {item.name}
                        </div>
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        )}
                        {item.note && (
                          <div className="text-sm text-gray-500">{item.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {pendingItems.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-600 mb-2">Shopping Complete!</h3>
                <p className="text-gray-600">All items have been checked off your list.</p>
                <Button 
                  className="mt-4 bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
                  onClick={() => setSelectedListId(null)}
                >
                  Back to Lists
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-20">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Shopping Mode</h1>
          <ShoppingCart className="h-6 w-6" />
        </div>
        <p className="text-white/80">Select a list to start shopping</p>
      </div>

      <div className="p-4">
        {activeShoppingLists.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Ready to Shop</h2>
            <div className="grid gap-3">
              {activeShoppingLists.map(list => {
                const pendingCount = list.items.filter(item => !item.checked).length;
                const progress = getProgress(list);
                
                return (
                  <Card 
                    key={list.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedListId(list.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{list.name}</h3>
                        <Badge variant="outline">{pendingCount} items</Badge>
                      </div>
                      
                      <Progress value={progress} className="mb-2" />
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{Math.round(progress)}% complete</span>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>~{Math.ceil(pendingCount * 2)} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Active Shopping Lists</h3>
              <p className="text-gray-500 mb-4">
                All your lists are complete! Create a new list or add items to get started.
              </p>
              <Link to="/lists">
                <Button className="bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90">
                  Go to Lists
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Shopping;
