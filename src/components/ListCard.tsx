
import React from 'react';
import { GroceryList } from '@/types';
import { Users, ArrowRight, Clock } from 'lucide-react';

interface ListCardProps {
  list: GroceryList;
  onClick: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  const completedItems = list.items.filter(item => item.checked).length;
  const totalItems = list.items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className="card-familyhub-hover p-4 text-left w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground font-poppins">{list.name}</h3>
        <div className="flex items-center space-x-2">
          {list.shared && (
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-primary" />
            </div>
          )}
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{totalItems} items</span>
          <span className="font-medium text-foreground">{Math.round(progress)}% complete</span>
        </div>
        
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {totalItems > 0 && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>~{Math.ceil((totalItems - completedItems) * 2)} min shopping time</span>
          </div>
        )}
      </div>
    </button>
  );
};
