
import React from 'react';
import { Tables } from '@/lib/supabase/types';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

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
      className="flex items-center p-3 bg-white rounded-md shadow-sm border border-muted mb-2"
      onClick={onClick}
    >
      {showCheckbox && (
        <div onClick={handleToggle} className="mr-3">
          <Checkbox checked={item.checked} />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center">
          <span className="mr-2">{item.icon}</span>
          <span className={item.checked ? "line-through text-muted-foreground" : ""}>
            {item.name}
          </span>
        </div>
        {item.quantity && item.quantity > 1 && (
          <div className="text-xs text-muted-foreground mt-1">
            Qty: {item.quantity}
          </div>
        )}
        {item.note && (
          <div className="text-xs text-muted-foreground mt-1">
            Note: {item.note}
          </div>
        )}
      </div>
      
      {showDelete && (
        <button 
          onClick={handleDelete}
          className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
