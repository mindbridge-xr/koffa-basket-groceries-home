
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefCard } from '@/components/chef/ChefCard';
import { ChefHat } from 'lucide-react';
import { Chef } from '@/types/chef';

interface ChefListProps {
  filteredChefs: Chef[];
  onChefClick: (chef: Chef) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const ChefList: React.FC<ChefListProps> = ({
  filteredChefs,
  onChefClick,
  hasActiveFilters,
  onClearFilters
}) => {
  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground font-poppins">
          Available Chefs ({filteredChefs.length})
        </h2>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Chef Grid */}
      {filteredChefs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredChefs.map(chef => (
            <ChefCard
              key={chef.id}
              chef={chef}
              onClick={() => onChefClick(chef)}
            />
          ))}
        </div>
      ) : (
        <Card className="card-familyhub p-8 text-center">
          <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">No chefs found</h3>
          <p className="text-muted-foreground mb-6 font-inter">
            Try adjusting your search criteria or browse all available chefs.
          </p>
          <Button 
            variant="outline"
            onClick={onClearFilters}
          >
            Show All Chefs
          </Button>
        </Card>
      )}
    </>
  );
};
