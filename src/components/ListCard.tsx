
import React from 'react';
import { GroceryList } from '@/types';
import { Users, ArrowRight, Clock } from 'lucide-react';
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
      className="card-uber-hover p-4 animate-press block"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-uber-lg text-uber-black">{list.name}</h3>
        <div className="flex items-center space-x-2">
          {list.shared && (
            <div className="w-6 h-6 bg-uber-gray-100 rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-uber-gray-600" />
            </div>
          )}
          <ArrowRight className="h-4 w-4 text-uber-gray-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-uber-sm">
          <span className="text-uber-gray-600">{totalItems} items</span>
          <span className="font-medium text-uber-black">{Math.round(progress)}% complete</span>
        </div>
        
        <div className="w-full h-2 bg-uber-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-uber-green rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {totalItems > 0 && (
          <div className="flex items-center text-uber-xs text-uber-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>~{Math.ceil((totalItems - completedItems) * 2)} min shopping time</span>
          </div>
        )}
      </div>
    </Link>
  );
};
