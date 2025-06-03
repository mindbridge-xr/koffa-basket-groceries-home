
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import { SmartItemSearch } from '@/components/SmartItemSearch';
import { foodItemsDatabase } from '@/data/foodItems';
import { toast } from '@/hooks/use-toast';

export const CategoryItems: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { categories, lists, addItemToList } = useApp();
  const [selectedListId, setSelectedListId] = useState<string>(lists[0]?.id || '');
  
  const category = categories.find(cat => cat.slug === slug);
  const categoryItems = foodItemsDatabase.filter(item => item.category === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-uber-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-uber-xl font-semibold text-uber-black mb-2">Category not found</h2>
          <Button onClick={() => navigate('/')} className="btn-uber-primary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToList = (item: any) => {
    if (!selectedListId) {
      toast({
        title: "No list selected",
        description: "Please select a list first.",
        variant: "destructive"
      });
      return;
    }
    
    addItemToList(selectedListId, {
      name: item.name,
      checked: false,
      quantity: 1,
      category_slug: item.category,
      icon: item.icon
    });
    
    toast({
      title: "Item added",
      description: `${item.name} added to ${lists.find(l => l.id === selectedListId)?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-uber-white pb-20">
      {/* Header */}
      <div className="bg-uber-white border-b border-uber-gray-100 sticky top-0 z-40">
        <div className="section-padding">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-uber-gray-50 rounded-xl transition-colors animate-press"
            >
              <ArrowLeft className="h-6 w-6 text-uber-black" />
            </button>
            <Button variant="outline" size="sm" className="btn-uber-secondary">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-uber-gray-50 rounded-xl flex items-center justify-center">
              <span className="text-4xl">{category.icon}</span>
            </div>
            <div>
              <h1 className="text-uber-2xl font-bold text-uber-black">{category.name}</h1>
              <p className="text-uber-sm text-uber-gray-500">{categoryItems.length} items available</p>
            </div>
          </div>
          
          {/* List Selector */}
          {lists.length > 0 && (
            <div className="mb-4">
              <label className="block text-uber-sm font-medium text-uber-black mb-2">
                Add to list:
              </label>
              <select
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
                className="input-uber w-full"
              >
                <option value="">Select a list</option>
                {lists.map(list => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="content-padding space-y-6 py-6">
        {/* Quick Add */}
        <div className="space-y-4">
          <h2 className="text-uber-lg font-semibold text-uber-black">Quick Add</h2>
          <SmartItemSearch
            onSelectItem={handleAddToList}
            placeholder={`Search ${category.name.toLowerCase()}...`}
          />
        </div>

        {/* Category Items */}
        <div className="space-y-4">
          <h2 className="text-uber-lg font-semibold text-uber-black">Popular Items</h2>
          <div className="grid grid-cols-2 gap-3">
            {categoryItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleAddToList(item)}
                className="card-uber-hover p-4 animate-press text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-uber-gray-50 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-uber-base text-uber-black truncate">{item.name}</h3>
                    <div className="flex items-center mt-1">
                      <Plus className="h-3 w-3 text-uber-green mr-1" />
                      <span className="text-uber-xs text-uber-green">Add to list</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {lists.length === 0 && (
          <div className="card-uber p-8 text-center">
            <h3 className="text-uber-lg font-semibold text-uber-black mb-2">No Lists Found</h3>
            <p className="text-uber-sm text-uber-gray-500 mb-4">
              Create a shopping list first to add items.
            </p>
            <Button onClick={() => navigate('/')} className="btn-uber-primary">
              Create List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
