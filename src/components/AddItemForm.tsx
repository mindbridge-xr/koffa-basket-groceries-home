
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmartItemSearch } from '@/components/SmartItemSearch';
import { toast } from '@/hooks/use-toast';

interface AddItemFormProps {
  listId: string;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ listId }) => {
  const { addItemToList } = useApp();

  const handleSelectItem = (item: any) => {
    addItemToList(listId, {
      name: item.name,
      checked: false,
      quantity: item.quantity || 1,
      category_slug: item.category_slug,
      icon: item.icon,
      note: item.note
    });
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to your list.`,
    });
  };

  return (
    <div className="sticky bottom-20 bg-uber-white p-4 border-t border-uber-gray-100 shadow-uber-lg">
      <div className="space-y-4">
        <SmartItemSearch
          onSelectItem={handleSelectItem}
          placeholder="Add items to your list..."
        />
        
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 text-uber-xs text-uber-gray-500">
            <div className="w-2 h-2 bg-uber-green rounded-full"></div>
            <span>Smart suggestions powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
