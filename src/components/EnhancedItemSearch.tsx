
import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Clock, TrendingUp, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface EnhancedItemSearchProps {
  onSelectItem: (item: any) => void;
  placeholder?: string;
}

export const EnhancedItemSearch: React.FC<EnhancedItemSearchProps> = ({ 
  onSelectItem, 
  placeholder = "Search items..." 
}) => {
  const { getFilteredItems, categories } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Enhanced item database with more realistic grocery items
  const commonItems = useMemo(() => [
    // Fruits & Vegetables
    { name: 'Bananas', category_slug: 'fruits-vegetables', icon: '🍌', popularity: 'high' },
    { name: 'Apples', category_slug: 'fruits-vegetables', icon: '🍎', popularity: 'high' },
    { name: 'Spinach', category_slug: 'fruits-vegetables', icon: '🥬', popularity: 'medium' },
    { name: 'Broccoli', category_slug: 'fruits-vegetables', icon: '🥦', popularity: 'medium' },
    { name: 'Carrots', category_slug: 'fruits-vegetables', icon: '🥕', popularity: 'high' },
    { name: 'Onions', category_slug: 'fruits-vegetables', icon: '🧅', popularity: 'high' },
    { name: 'Tomatoes', category_slug: 'fruits-vegetables', icon: '🍅', popularity: 'high' },
    { name: 'Avocado', category_slug: 'fruits-vegetables', icon: '🥑', popularity: 'high' },
    
    // Meat & Seafood
    { name: 'Chicken Breast', category_slug: 'meat-seafood', icon: '🍗', popularity: 'high' },
    { name: 'Ground Beef', category_slug: 'meat-seafood', icon: '🥩', popularity: 'high' },
    { name: 'Salmon', category_slug: 'meat-seafood', icon: '🐟', popularity: 'medium' },
    { name: 'Ground Turkey', category_slug: 'meat-seafood', icon: '🦃', popularity: 'medium' },
    
    // Dairy & Eggs
    { name: 'Milk', category_slug: 'dairy-eggs', icon: '🥛', popularity: 'high' },
    { name: 'Eggs', category_slug: 'dairy-eggs', icon: '🥚', popularity: 'high' },
    { name: 'Greek Yogurt', category_slug: 'dairy-eggs', icon: '🍶', popularity: 'high' },
    { name: 'Cheese', category_slug: 'dairy-eggs', icon: '🧀', popularity: 'high' },
    { name: 'Butter', category_slug: 'dairy-eggs', icon: '🧈', popularity: 'high' },
    
    // Bakery
    { name: 'Bread', category_slug: 'bakery', icon: '🍞', popularity: 'high' },
    { name: 'Bagels', category_slug: 'bakery', icon: '🥯', popularity: 'medium' },
    
    // Pantry
    { name: 'Rice', category_slug: 'pantry', icon: '🍚', popularity: 'high' },
    { name: 'Pasta', category_slug: 'pantry', icon: '🍝', popularity: 'high' },
    { name: 'Olive Oil', category_slug: 'pantry', icon: '🫒', popularity: 'high' },
    { name: 'Quinoa', category_slug: 'pantry', icon: '🌾', popularity: 'medium' },
    { name: 'Oats', category_slug: 'pantry', icon: '🌾', popularity: 'medium' },
    
    // Beverages
    { name: 'Coffee', category_slug: 'beverages', icon: '☕', popularity: 'high' },
    { name: 'Orange Juice', category_slug: 'beverages', icon: '🧃', popularity: 'medium' },
    { name: 'Sparkling Water', category_slug: 'beverages', icon: '💧', popularity: 'medium' },
    
    // Snacks
    { name: 'Almonds', category_slug: 'snacks', icon: '🌰', popularity: 'medium' },
    { name: 'Crackers', category_slug: 'snacks', icon: '🍪', popularity: 'medium' },
  ], []);

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];

    const filtered = commonItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by popularity and relevance
    return filtered.sort((a, b) => {
      const aRelevance = a.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 1 : 0;
      const bRelevance = b.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 1 : 0;
      const aPopularity = a.popularity === 'high' ? 2 : a.popularity === 'medium' ? 1 : 0;
      const bPopularity = b.popularity === 'high' ? 2 : b.popularity === 'medium' ? 1 : 0;
      
      if (aRelevance !== bRelevance) return bRelevance - aRelevance;
      return bPopularity - aPopularity;
    });
  }, [searchTerm, commonItems]);

  const popularItems = useMemo(() => 
    commonItems.filter(item => item.popularity === 'high').slice(0, 8),
    [commonItems]
  );

  const recentItems = useMemo(() => 
    commonItems.slice(0, 6),
    [commonItems]
  );

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSelectItem = (item: any) => {
    onSelectItem({
      id: Date.now().toString(),
      name: item.name,
      checked: false,
      quantity: 1,
      category_slug: item.category_slug,
      icon: item.icon
    });
    setSearchTerm('');
    setShowResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectItem(searchResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10"
          onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
        />
      </div>

      {showResults && (
        <Card className="absolute z-20 top-full left-0 right-0 mt-1 max-h-80 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className={`p-3 border-b border-muted hover:bg-muted/20 cursor-pointer flex items-center justify-between ${
                      index === selectedIndex ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-xs text-muted-foreground">
                          {categories.find(c => c.slug === item.category_slug)?.name || 'Other'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {item.popularity === 'high' && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No items found for "{searchTerm}"</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleSelectItem({ name: searchTerm, category_slug: 'pantry', icon: '📦' })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add "{searchTerm}" as custom item
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!showResults && searchTerm.length === 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Popular Items</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularItems.map((item, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-koffa-aqua-forest hover:text-white transition-colors"
                      onClick={() => handleSelectItem(item)}
                    >
                      {item.icon} {item.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Quick Add</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentItems.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => handleSelectItem(item)}
                    >
                      {item.icon} {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
