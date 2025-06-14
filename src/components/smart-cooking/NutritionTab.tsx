
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';

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

interface NutritionTabProps {
  nutritionData: NutritionData | null;
  isCalculating: boolean;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({
  nutritionData,
  isCalculating
}) => {
  if (nutritionData) {
    return (
      <Card className="card-familyhub">
        <CardHeader>
          <CardTitle className="font-poppins">Nutrition Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-inter">Calories:</span>
                <span className="font-semibold">{nutritionData.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter">Protein:</span>
                <span className="font-semibold">{nutritionData.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter">Carbs:</span>
                <span className="font-semibold">{nutritionData.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter">Fat:</span>
                <span className="font-semibold">{nutritionData.fat}g</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-inter">Fiber:</span>
                <span className="font-semibold">{nutritionData.fiber}g</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter">Sugar:</span>
                <span className="font-semibold">{nutritionData.sugar}g</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter">Sodium:</span>
                <span className="font-semibold">{nutritionData.sodium}mg</span>
              </div>
            </div>
          </div>
          
          {nutritionData.healthScore && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-800 font-inter">Health Score:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {nutritionData.healthScore}/100
                </Badge>
              </div>
              <p className="text-sm text-green-700 mt-1 font-inter">
                {nutritionData.healthScore >= 80 ? 'Excellent choice for family nutrition!' :
                 nutritionData.healthScore >= 60 ? 'Good nutritional balance' :
                 'Consider healthier alternatives'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-familyhub">
      <CardContent className="p-8 text-center">
        <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-inter">
          {isCalculating ? 'Calculating nutrition information...' : 'Select a recipe to view nutrition information'}
        </p>
      </CardContent>
    </Card>
  );
};
