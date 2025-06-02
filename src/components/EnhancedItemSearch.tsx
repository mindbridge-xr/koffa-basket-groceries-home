
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Search, Plus, Clock } from 'lucide-react';

interface EnhancedItemSearchProps {
  onSelectItem: (item: any) => void;
  placeholder?: string;
}

export const EnhancedItemSearch: React.FC<EnhancedItemSearchProps> = ({
  onSelectItem,
  placeholder = "Search for items..."
}) => {
  const { categories, lists } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Common grocery items database
  const commonItems = [
    { name: 'Milk', category_slug: 'dairy-eggs', icon: '🥛' },
    { name: 'Bread', category_slug: 'bakery', icon: '🍞' },
    { name: 'Eggs', category_slug: 'dairy-eggs', icon: '🥚' },
    { name: 'Bananas', category_slug: 'fruits-vegetables', icon: '🍌' },
    { name: 'Chicken Breast', category_slug: 'meat-seafood', icon: '🍗' },
    { name: 'Rice', category_slug: 'pantry', icon: '🍚' },
    { name: 'Pasta', category_slug: 'pantry', icon: '🍝' },
    { name: 'Tomatoes', category_slug: 'fruits-vegetables', icon: '🍅' },
    { name: 'Onions', category_slug: 'fruits-vegetables', icon: '🧅' },
    { name: 'Butter', category_slug: 'dairy-eggs', icon: '🧈' },
    { name: 'Cheese', category_slug: 'dairy-eggs', icon: '🧀' },
    { name: 'Yogurt', category_slug: 'dairy-eggs', icon: '🥛' },
    { name: 'Apples', category_slug: 'fruits-vegetables', icon: '🍎' },
    { name: 'Potatoes', category_slug: 'fruits-vegetables', icon: '🥔' },
    { name: 'Carrots', category_slug: 'fruits-vegetables', icon: '🥕' },
    { name: 'Ground Beef', category_slug: 'meat-seafood', icon: '🥩' },
    { name: 'Salmon', category_slug: 'meat-seafood', icon: '🐟' },
    { name: 'Olive Oil', category_slug: 'pantry', icon: '🫒' },
    { name: 'Salt', category_slug: 'pantry', icon: '🧂' },
    { name: 'Black Pepper', category_slug: 'pantry', icon: '🌶️' }
  ];

  // Get recently used items from lists
  const getRecentItems = () => {
    const allItems = lists.flatMap(list => list.items);
    const uniqueItems = Array.from(
      new Map(allItems.map(item => [item.name.toLowerCase(), item])).values()
    );
    return uniqueItems.slice(0, 5);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const recentItems = getRecentItems();
    
    // Filter common items by search query
    const filteredCommonItems = commonItems.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    // Filter recent items by search query
    const filteredRecentItems = recentItems.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    // Combine and deduplicate
    const allSuggestions = [
      ...filteredRecentItems.map(item => ({ ...item, isRecent: true })),
      ...filteredCommonItems.filter(commonItem =>
        !filteredRecentItems.some(recentItem =>
          recentItem.name.toLowerCase() === commonItem.name.toLowerCase()
        )
      )
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
      const defaultCategory = categories[0];
      onSelectItem({
        name: searchQuery.trim(),
        category_slug: defaultCategory?.slug,
        icon: defaultCategory?.icon || '📦',
        quantity: 1
      });
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>

      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-2">
            {suggestions.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-2 h-auto hover:bg-koffa-aqua-forest/10"
                onClick={() => handleSelectItem(item)}
              >
                <span className="text-lg mr-2">{item.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    {item.isRecent && (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {item.isRecent ? 'Recently used' : 'Common item'}
                  </div>
                </div>
              </Button>
            ))}
            
            {searchQuery && !suggestions.some(s => s.name.toLowerCase() === searchQuery.toLowerCase()) && (
              <Button
                variant="ghost"
                className="w-full justify-start p-2 h-auto border-t mt-2 pt-3 hover:bg-koffa-aqua-forest/10"
                onClick={handleCreateCustomItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Add "{searchQuery}"</div>
                  <div className="text-xs text-muted-foreground">Create custom item</div>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
