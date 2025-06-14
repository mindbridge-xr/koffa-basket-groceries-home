
import { useState, useEffect, useCallback } from 'react';
import { GroceryItem } from '@/types';
import { SmartListItem, StoreSection, HealthMetrics } from '@/types/smartShopping';
import { organizeSmartList } from '@/utils/smartListOrganizer';
import { useHealthTracking } from '@/hooks/useHealthTracking';

interface ShoppingSessionState {
  isActive: boolean;
  listId: string | null;
  sections: StoreSection[];
  currentSectionIndex: number;
  completedSections: string[];
  totalItems: number;
  completedItems: number;
}

export const useShoppingSession = () => {
  const [sessionState, setSessionState] = useState<ShoppingSessionState>({
    isActive: false,
    listId: null,
    sections: [],
    currentSectionIndex: 0,
    completedSections: [],
    totalItems: 0,
    completedItems: 0
  });

  const {
    isTracking,
    currentMetrics,
    startTracking,
    stopTracking,
    getWeeklyStats
  } = useHealthTracking();

  // Convert GroceryItem to SmartListItem with proper type safety
  const convertToSmartItem = useCallback((item: GroceryItem): SmartListItem => {
    return {
      id: item.id,
      name: item.name,
      category: item.category_slug || 'other',
      icon: item.icon || '📦',
      checked: item.checked,
      quantity: item.quantity || 1,
      priority: calculateItemPriority(item),
      nutritionScore: calculateNutritionScore(item.name),
      calories: estimateCalories(item.name)
    };
  }, []);

  // Start a new shopping session
  const startSession = useCallback((listId: string, items: GroceryItem[]) => {
    const smartItems = items.map(convertToSmartItem);
    const sections = organizeSmartList(items);
    
    setSessionState({
      isActive: true,
      listId,
      sections,
      currentSectionIndex: 0,
      completedSections: [],
      totalItems: items.length,
      completedItems: items.filter(item => item.checked).length
    });

    startTracking(listId);
  }, [convertToSmartItem, startTracking]);

  // End shopping session
  const endSession = useCallback(() => {
    if (sessionState.listId) {
      const session = stopTracking(
        sessionState.listId, 
        sessionState.completedItems, 
        sessionState.totalItems
      );
      
      setSessionState({
        isActive: false,
        listId: null,
        sections: [],
        currentSectionIndex: 0,
        completedSections: [],
        totalItems: 0,
        completedItems: 0
      });

      return session;
    }
  }, [sessionState, stopTracking]);

  // Update item status and sync with sections
  const updateItemStatus = useCallback((itemId: string, checked: boolean) => {
    setSessionState(prev => {
      const updatedSections = prev.sections.map(section => ({
        ...section,
        items: section.items.map(item => 
          item.id === itemId ? { ...item, checked } : item
        )
      }));

      const newCompletedItems = updatedSections
        .flatMap(s => s.items)
        .filter(item => item.checked).length;

      return {
        ...prev,
        sections: updatedSections,
        completedItems: newCompletedItems
      };
    });
  }, []);

  // Complete current section and advance
  const completeCurrentSection = useCallback(() => {
    setSessionState(prev => {
      const currentSection = prev.sections[prev.currentSectionIndex];
      if (!currentSection) return prev;

      const updatedSections = prev.sections.map((section, index) => 
        index === prev.currentSectionIndex 
          ? { ...section, visited: true }
          : section
      );

      // Find next incomplete section
      const nextSectionIndex = updatedSections.findIndex(
        (section, index) => 
          index > prev.currentSectionIndex && 
          !section.visited && 
          section.items.some(item => !item.checked)
      );

      return {
        ...prev,
        sections: updatedSections,
        completedSections: [...prev.completedSections, currentSection.id],
        currentSectionIndex: nextSectionIndex !== -1 ? nextSectionIndex : prev.currentSectionIndex
      };
    });
  }, []);

  // Get current section with safety checks
  const getCurrentSection = useCallback(() => {
    return sessionState.sections[sessionState.currentSectionIndex] || null;
  }, [sessionState.sections, sessionState.currentSectionIndex]);

  // Calculate shopping progress
  const getProgress = useCallback(() => {
    if (sessionState.totalItems === 0) return 0;
    return Math.round((sessionState.completedItems / sessionState.totalItems) * 100);
  }, [sessionState.completedItems, sessionState.totalItems]);

  // Check if shopping is complete
  const isShoppingComplete = useCallback(() => {
    return sessionState.completedItems === sessionState.totalItems && sessionState.totalItems > 0;
  }, [sessionState.completedItems, sessionState.totalItems]);

  return {
    // Session state
    sessionState,
    isActive: sessionState.isActive,
    currentSection: getCurrentSection(),
    progress: getProgress(),
    isComplete: isShoppingComplete(),
    
    // Health tracking
    isTracking,
    currentMetrics,
    weeklyStats: getWeeklyStats(),
    
    // Actions
    startSession,
    endSession,
    updateItemStatus,
    completeCurrentSection
  };
};

// Helper functions
const calculateItemPriority = (item: GroceryItem): number => {
  let priority = 50;
  
  const perishableCategories = ['dairy-eggs', 'meat-seafood', 'fruits-vegetables'];
  if (perishableCategories.includes(item.category_slug || '')) {
    priority += 20;
  }
  
  if (item.quantity && item.quantity > 1) {
    priority += item.quantity * 5;
  }
  
  return Math.min(priority, 100);
};

const calculateNutritionScore = (itemName: string): number => {
  const healthyItems = ['apple', 'banana', 'broccoli', 'spinach', 'salmon', 'chicken', 'yogurt'];
  const unhealthyItems = ['candy', 'soda', 'chips', 'cookies', 'ice cream'];
  
  const name = itemName.toLowerCase();
  
  if (healthyItems.some(healthy => name.includes(healthy))) {
    return Math.floor(Math.random() * 20) + 80;
  } else if (unhealthyItems.some(unhealthy => name.includes(unhealthy))) {
    return Math.floor(Math.random() * 30) + 20;
  }
  
  return Math.floor(Math.random() * 40) + 50;
};

const estimateCalories = (itemName: string): number => {
  const calorieMap: { [key: string]: number } = {
    'apple': 95, 'banana': 105, 'bread': 80, 'milk': 150,
    'chicken': 165, 'rice': 130, 'pasta': 220, 'cheese': 110
  };
  
  const name = itemName.toLowerCase();
  const match = Object.keys(calorieMap).find(key => name.includes(key));
  
  return match ? calorieMap[match] : Math.floor(Math.random() * 150) + 50;
};
