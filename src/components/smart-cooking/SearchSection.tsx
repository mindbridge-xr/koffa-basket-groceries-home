
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  onQuickSearch: (query: string) => void;
}

const quickSuggestions = [
  { label: 'Family Dinner', query: 'chicken family' },
  { label: 'Quick Breakfast', query: 'quick breakfast' },
  { label: 'Healthy Lunch', query: 'healthy lunch' },
  { label: 'Kid-Friendly', query: 'easy kids' }
];

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  isLoading,
  onQuickSearch
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="flex items-center font-poppins">
          <Search className="h-5 w-5 mr-2" />
          Recipe Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search recipes by ingredient or dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-familyhub"
          />
          <Button 
            onClick={onSearch}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onQuickSearch(suggestion.query)}
              className="text-xs"
            >
              {suggestion.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
