
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Search, Plus, Clock, Sparkles } from 'lucide-react';
import { searchFoodItems, findFoodItem } from '@/data/foodItems';

interface SmartItemSearchProps {
  onSelectItem: (item: any) => void;
  placeholder?: string;
}

export const SmartItemSearch: React.FC<SmartItemSearchProps> = ({
  onSelectItem,
  placeholder = "Search for items..."
}) => {
  const { categories, lists } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get recently used items from lists
  const getRecentItems = () => {
    const allItems = lists.flatMap(list => list.items);
    const uniqueItems = Array.from(
      new Map(allItems.map(item => [item.name.toLowerCase(), item])).values()
    );
    return uniqueItems.slice(0, 3);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      // Show recent items when no search
      const recentItems = getRecentItems();
      setSuggestions(recentItems.map(item => ({ ...item, isRecent: true })));
      setShowSuggestions(recentItems.length > 0);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search in our smart food database
    const smartResults = searchFoodItems(query, 6);
    
    // Also search recent items
    const recentItems = getRecentItems().filter(item =>
      item.name.toLowerCase().includes(query)
    );

    // Combine results with smart food items taking priority
    const allSuggestions = [
      ...recentItems.map(item => ({ ...item, isRecent: true })),
      ...smartResults.filter(smartItem =>
        !recentItems.some(recentItem =>
          recentItem.name.toLowerCase() === smartItem.name.toLowerCase()
        )
      ).map(item => ({
        ...item,
        category_slug: item.category,
        isSmart: true
      }))
    ].slice(0, 8);

    setSuggestions(allSuggestions);
    setShowSuggestions(allSuggestions.length > 0);
  }, [searchQuery, lists]);

  const handleSelectItem = (item: any) => {
    onSelectItem({
      ...item,
      quantity: 1
    });
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleCreateCustomItem = () => {
    if (searchQuery.trim()) {
      // Try to find smart icon first
      const smartItem = findFoodItem(searchQuery);
      const defaultCategory = categories[0];
      
      onSelectItem({
        name: searchQuery.trim(),
        category_slug: smartItem?.category || defaultCategory?.slug,
        icon: smartItem?.icon || defaultCategory?.icon || '📦',
        quantity: 1
      });
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-uber-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={placeholder}
          className="input-uber pl-12 h-12 text-uber-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto card-uber shadow-uber-lg">
          <CardContent className="p-2">
            {!searchQuery && (
              <div className="px-3 py-2 text-uber-sm text-uber-gray-500 font-medium border-b border-uber-gray-100">
                Recent Items
              </div>
            )}
            
            {suggestions.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-uber-gray-50 animate-press rounded-uber"
                onClick={() => handleSelectItem(item)}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-uber-base text-uber-black">{item.name}</div>
                  <div className="text-uber-sm text-uber-gray-500 flex items-center">
                    {item.isRecent && (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="mr-2">Recently used</span>
                      </>
                    )}
                    {item.isSmart && (
                      <>
                        <Sparkles className="h-3 w-3 mr-1 text-uber-green" />
                        <span className="mr-2">Smart suggestion</span>
                      </>
                    )}
                    <Badge variant="outline" className="text-uber-xs">
                      {item.category_slug?.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              </Button>
            ))}
            
            {searchQuery && !suggestions.some(s => s.name.toLowerCase() === searchQuery.toLowerCase()) && (
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto border-t mt-2 pt-3 hover:bg-uber-gray-50 animate-press rounded-uber"
                onClick={handleCreateCustomItem}
              >
                <Plus className="h-5 w-5 mr-3 text-uber-gray-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-uber-base text-uber-black">Add "{searchQuery}"</div>
                  <div className="text-uber-sm text-uber-gray-500">Create custom item</div>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
