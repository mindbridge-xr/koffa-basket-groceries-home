
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  healthScore?: number;
}

export function useNutrition() {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateNutrition = async (recipe: any) => {
    setIsCalculating(true);
    
    try {
      // For demo purposes, simulate nutrition calculation
      // In a real implementation, this would use a nutrition API
      const mockNutrition = await simulateNutritionCalculation(recipe);
      setNutritionData(mockNutrition);
      
      toast({
        title: "Nutrition calculated",
        description: "Nutritional information is now available"
      });
    } catch (error) {
      console.error('Error calculating nutrition:', error);
      toast({
        title: "Calculation failed",
        description: "Unable to calculate nutrition. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const simulateNutritionCalculation = async (recipe: any): Promise<NutritionData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock nutrition calculation based on recipe category
    const baseNutrition = {
      'Chicken': { calories: 350, protein: 30, carbs: 25, fat: 15 },
      'Beef': { calories: 420, protein: 35, carbs: 20, fat: 22 },
      'Seafood': { calories: 280, protein: 28, carbs: 15, fat: 12 },
      'Vegetarian': { calories: 250, protein: 12, carbs: 40, fat: 8 },
      'Dessert': { calories: 450, protein: 6, carbs: 65, fat: 18 },
      'Default': { calories: 320, protein: 20, carbs: 35, fat: 12 }
    };
    
    const category = recipe.strCategory || 'Default';
    const base = baseNutrition[category as keyof typeof baseNutrition] || baseNutrition.Default;
    
    // Add some randomization for realism
    const variation = 0.2; // 20% variation
    
    const nutrition: NutritionData = {
      calories: Math.round(base.calories * (1 + (Math.random() - 0.5) * variation)),
      protein: Math.round(base.protein * (1 + (Math.random() - 0.5) * variation)),
      carbs: Math.round(base.carbs * (1 + (Math.random() - 0.5) * variation)),
      fat: Math.round(base.fat * (1 + (Math.random() - 0.5) * variation)),
      fiber: Math.round(Math.random() * 8 + 2), // 2-10g
      sugar: Math.round(Math.random() * 15 + 5), // 5-20g
      sodium: Math.round(Math.random() * 800 + 200) // 200-1000mg
    };
    
    // Calculate health score based on nutrition profile
    let healthScore = 50; // Base score
    
    // Protein boost
    if (nutrition.protein >= 25) healthScore += 15;
    else if (nutrition.protein >= 15) healthScore += 10;
    
    // Fiber boost
    if (nutrition.fiber >= 6) healthScore += 15;
    else if (nutrition.fiber >= 4) healthScore += 10;
    
    // Low sodium boost
    if (nutrition.sodium <= 400) healthScore += 10;
    else if (nutrition.sodium <= 600) healthScore += 5;
    
    // Calorie consideration
    if (nutrition.calories <= 350) healthScore += 10;
    
    // Sugar penalty
    if (nutrition.sugar > 15) healthScore -= 10;
    
    nutrition.healthScore = Math.min(Math.max(healthScore, 0), 100);
    
    return nutrition;
  };

  const getDietaryRecommendations = (nutrition: NutritionData) => {
    const recommendations = [];
    
    if (nutrition.protein < 15) {
      recommendations.push("Consider adding more protein-rich ingredients");
    }
    
    if (nutrition.fiber < 4) {
      recommendations.push("Add more vegetables or whole grains for fiber");
    }
    
    if (nutrition.sodium > 600) {
      recommendations.push("Try to reduce salt or use herbs and spices instead");
    }
    
    if (nutrition.sugar > 15) {
      recommendations.push("Consider reducing added sugars");
    }
    
    return recommendations;
  };

  return {
    nutritionData,
    isCalculating,
    calculateNutrition,
    getDietaryRecommendations
  };
}
