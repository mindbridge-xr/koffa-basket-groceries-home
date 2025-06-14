
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Star, Zap, Timer } from 'lucide-react';
import { SmartListItem } from '@/types/smartShopping';
import { cn } from '@/lib/utils';

interface SmartShoppingTileProps {
  item: SmartListItem;
  onToggle: (itemId: string) => void;
  onQuickAdd?: (itemId: string) => void;
  showNutrition?: boolean;
}

export const SmartShoppingTile: React.FC<SmartShoppingTileProps> = ({
  item,
  onToggle,
  onQuickAdd,
  showNutrition = true
}) => {
  const getNutritionColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleTileClick = () => {
    onToggle(item.id);
  };

  return (
    <Card 
      className={cn(
        "p-4 transition-all duration-300 cursor-pointer select-none",
        "hover:shadow-lg hover:scale-105 active:scale-95",
        item.checked 
          ? "bg-green-50 border-green-200 opacity-75" 
          : "bg-white border-gray-200 shadow-md"
      )}
      onClick={handleTileClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors",
            item.checked ? "bg-green-100" : "bg-gray-100"
          )}>
            {item.icon}
          </div>
          
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold text-lg transition-all",
              item.checked ? "line-through text-gray-500" : "text-gray-900"
            )}>
              {item.name}
            </h3>
            
            <div className="flex items-center space-x-2 mt-1">
              {item.quantity > 1 && (
                <Badge variant="outline" className="text-xs">
                  Qty: {item.quantity}
                </Badge>
              )}
              
              {item.priority > 70 && (
                <Badge className="text-xs bg-orange-100 text-orange-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Priority
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {item.checked ? (
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          ) : (
            <Circle className="w-8 h-8 text-gray-400" />
          )}
        </div>
      </div>
      
      {showNutrition && (item.nutritionScore || item.calories) && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {item.nutritionScore && (
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                getNutritionColor(item.nutritionScore)
              )}>
                Health: {item.nutritionScore}/100
              </span>
            </div>
          )}
          
          {item.calories && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <Timer className="w-3 h-3" />
              <span>{item.calories} cal</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
