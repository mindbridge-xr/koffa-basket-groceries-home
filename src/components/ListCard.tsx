
import React from 'react';
import { GroceryList } from '@/types';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ListCardProps {
  list: GroceryList;
}

export const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const completedItems = list.items.filter(item => item.checked).length;
  const totalItems = list.items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Link
      to={`/list/${list.id}`}
      className="block w-full p-4 rounded-lg bg-white shadow-md border border-muted hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{list.name}</h3>
        {list.shared && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>Shared</span>
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{completedItems}/{totalItems} items</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-koffa-aqua-forest rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
};
