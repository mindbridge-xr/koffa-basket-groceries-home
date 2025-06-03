
import React from 'react';
import { Tables } from '@/lib/supabase/types';
import { Checkbox } from '@/components/ui/checkbox';
import { X, MoreHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface GroceryItemCardProps {
  item: Tables['items'] & {
    checked?: boolean;
    quantity?: number;
    note?: string;
  };
  listId: string;
  showCheckbox?: boolean;
  showDelete?: boolean;
  onClick?: () => void;
}

export const GroceryItemCard: React.FC<GroceryItemCardProps> = ({
  item,
  listId,
  showCheckbox = true,
  showDelete = false,
  onClick,
}) => {
  const { toggleItemChecked, removeItemFromList } = useApp();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItemChecked(listId, item.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItemFromList(listId, item.id);
  };

  return (
    <div 
      className={cn(
        "flex items-center p-4 rounded-uber border-0 transition-all duration-200 animate-press",
        item.checked 
          ? "bg-uber-gray-50 border-l-4 border-l-uber-green" 
          : "bg-uber-white shadow-uber hover:shadow-uber-md",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {showCheckbox && (
        <div 
          onClick={handleToggle} 
          className="mr-4 p-1 rounded-full hover:bg-uber-gray-50 transition-colors"
        >
          <Checkbox 
            checked={item.checked} 
            className="h-5 w-5 rounded-full border-2 border-uber-gray-300 data-[state=checked]:bg-uber-green data-[state=checked]:border-uber-green"
          />
        </div>
      )}
      
      <div className="flex items-center flex-1">
        <div className="w-10 h-10 bg-uber-gray-50 rounded-xl flex items-center justify-center mr-3">
          <span className="text-lg">{item.icon}</span>
        </div>
        
        <div className="flex-1">
          <div className={cn(
            "font-medium text-uber-base transition-all duration-200",
            item.checked ? "line-through text-uber-gray-500" : "text-uber-black"
          )}>
            {item.name}
          </div>
          
          <div className="flex items-center space-x-3 mt-1">
            {item.quantity && item.quantity > 1 && (
              <div className="text-uber-sm text-uber-gray-500">
                Qty: {item.quantity}
              </div>
            )}
            {item.note && (
              <div className="text-uber-sm text-uber-gray-500 truncate">
                {item.note}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {showDelete && (
          <button 
            onClick={handleDelete}
            className="p-2 text-uber-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 animate-press"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!showDelete && onClick && (
          <button className="p-2 text-uber-gray-400 hover:text-uber-black hover:bg-uber-gray-50 rounded-full transition-all duration-200">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
