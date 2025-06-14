
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
  const { id } = useParams<{ id: string }>();
  const {
    lists,
    currentList,
    setCurrentList,
    familyMembers,
    shareList,
    unshareList,
    categories
  } = useApp();
  const [showCompleted, setShowCompleted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('ListDetail: Attempting to load list with ID:', id);
    console.log('Available lists:', lists.map(l => ({ id: l.id, name: l.name })));
    
    if (id) {
      setCurrentList(id);
      setIsLoading(false);
    } else {
      console.error('ListDetail: No ID provided in route parameters');
      setIsLoading(false);
    }
    
    return () => {
      setCurrentList(null);
    };
  }, [id, setCurrentList, lists]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-koffa-snow-drift flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-koffa-aqua-forest"></div>
        <p className="text-gray-600 mt-2">Loading list...</p>
      </div>
    );
  }

  if (!currentList) {
    return (
      <div className="min-h-screen bg-koffa-snow-drift flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">List Not Found</h2>
          <p className="text-gray-600 mb-4">
            The list with ID "{id}" could not be found.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            <p>Available lists:</p>
            <ul className="mt-2">
              {lists.map(list => (
                <li key={list.id} className="text-xs">
                  {list.name} (ID: {list.id})
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <Link to="/lists" className="block">
              <Button className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90">
                Browse All Lists
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Convert the items to the expected format
  const listItems: ListItem[] = currentList.items.map(item => ({
    id: item.id,
    name: item.name,
    category_id: item.category_slug || '',
    icon: item.icon || '📋',
    created_at: new Date().toISOString(),
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
      <div className="bg-koffa-aqua-forest text-white p-6 bg-red-500">
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
                      <div key={member.id} className="flex items-center justify-between p-2 rounded hover:bg-muted">
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
