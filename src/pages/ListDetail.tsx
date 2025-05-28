
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ChevronLeft, Share2, MoreVertical } from 'lucide-react';
import { GroceryItemCard } from '@/components/GroceryItemCard';
import { AddItemForm } from '@/components/AddItemForm';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CategoryCard } from '@/components/CategoryCard';
import { Tables } from '@/lib/supabase/types';

type ListItem = Tables['items'] & {
  checked?: boolean;
  quantity?: number;
  note?: string;
};

export const ListDetail: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const { lists, currentList, setCurrentList, familyMembers, shareList, unshareList, categories } = useApp();
  const [showCompleted, setShowCompleted] = useState(true);
  
  useEffect(() => {
    if (listId) {
      setCurrentList(listId);
    }
    
    return () => {
      setCurrentList(null);
    };
  }, [listId, setCurrentList]);
  
  if (!currentList) {
    return (
      <div className="min-h-screen bg-koffa-snow-drift flex flex-col items-center justify-center p-4">
        <p className="text-gray-600">List not found</p>
        <Link to="/" className="text-koffa-aqua-forest hover:underline mt-2">
          Go back home
        </Link>
      </div>
    );
  }
  
  // Convert the items to the expected format
  const listItems: ListItem[] = currentList.items.map(item => ({
    id: item.id,
    name: item.name,
    category_id: item.category_id || '',
    icon: item.icon || '📋',
    created_at: item.created_at || new Date().toISOString(),
    checked: item.checked,
    quantity: item.quantity,
    note: item.note
  }));
  
  const completedItems = listItems.filter(item => item.checked);
  const pendingItems = listItems.filter(item => !item.checked);
  
  const groupedByCategory = listItems.reduce((acc, item) => {
    const categoryId = item.category_id || 'uncategorized';
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(item);
    return acc;
  }, {} as Record<string, ListItem[]>);
  
  const handleShareToggle = (userId: string) => {
    if (currentList.sharedWith?.includes(userId)) {
      unshareList(currentList.id, userId);
    } else {
      shareList(currentList.id, userId);
    }
  };
  
  return (
    <div className="min-h-screen bg-koffa-snow-drift pb-24">
      <div className="bg-koffa-aqua-forest text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <Link to="/lists" className="flex items-center text-white/90 hover:text-white">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Share2 className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-4">
                  <h4 className="font-medium">Share with family</h4>
                  <div className="space-y-2">
                    {familyMembers.map(member => (
                      <div 
                        key={member.id} 
                        className="flex items-center justify-between p-2 rounded hover:bg-muted"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="ml-2">{member.name}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className={currentList.sharedWith?.includes(member.id) ? "bg-koffa-aqua-forest text-white hover:bg-koffa-aqua-forest/90" : ""}
                          onClick={() => handleShareToggle(member.id)}
                        >
                          {currentList.sharedWith?.includes(member.id) ? "Shared" : "Share"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setShowCompleted(!showCompleted)}
                  >
                    {showCompleted ? "Hide" : "Show"} completed
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold">{currentList.name}</h1>
        <div className="flex items-center mt-2">
          <div className="text-sm">{listItems.length} items</div>
          <div className="mx-2">•</div>
          <div className="text-sm">{completedItems.length} completed</div>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {pendingItems.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3">To Buy</h2>
            <div className="space-y-2">
              {pendingItems.map(item => (
                <GroceryItemCard
                  key={item.id}
                  item={item}
                  listId={currentList.id}
                  showDelete={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {showCompleted && completedItems.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3">Completed</h2>
            <div className="space-y-2">
              {completedItems.map(item => (
                <GroceryItemCard
                  key={item.id}
                  item={item}
                  listId={currentList.id}
                  showDelete={true}
                />
              ))}
            </div>
          </div>
        )}
        
        {listItems.length === 0 && (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium text-gray-600">Empty list</h3>
            <p className="text-gray-500 mt-2">
              Add items to your list using the form below
            </p>
          </div>
        )}
      </div>
      
      <AddItemForm listId={currentList.id} />
      <BottomNav />
    </div>
  );
};

export default ListDetail;
