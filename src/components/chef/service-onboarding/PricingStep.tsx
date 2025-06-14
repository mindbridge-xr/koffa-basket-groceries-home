
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceOnboardingData } from '@/types/serviceOnboarding';
import { DollarSign, ShoppingCart, Settings } from 'lucide-react';

interface PricingStepProps {
  data: ServiceOnboardingData;
  onUpdate: (updates: Partial<ServiceOnboardingData>) => void;
  chefProfile: any;
}

export const PricingStep: React.FC<PricingStepProps> = ({ data, onUpdate, chefProfile }) => {
  const getSuggestedPricing = () => {
    const baseRate = chefProfile.hourlyRate || 50;
    const serviceDuration = data.duration / 60; // Convert to hours
    const suggestedPrice = Math.round(baseRate * serviceDuration * 1.2); // 20% markup for service
    return suggestedPrice;
  };

  const suggestedPrice = getSuggestedPricing();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Pricing & Options</h3>
        <p className="text-muted-foreground text-sm">Set your pricing and service options</p>
      </div>

      <div className="space-y-6">
        {/* Base Price */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Base Price</h4>
              <p className="text-xs text-muted-foreground">Your service rate</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={data.price}
                onChange={(e) => onUpdate({ price: parseInt(e.target.value) || 0 })}
                min="25"
                step="5"
                className="pl-10 text-lg font-semibold"
                placeholder="100"
              />
            </div>
            
            {suggestedPrice !== data.price && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">Suggested: ${suggestedPrice}</span>
                <button
                  type="button"
                  onClick={() => onUpdate({ price: suggestedPrice })}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Use suggestion
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Service Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Service Options</h4>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Includes Groceries</p>
                  <p className="text-xs text-muted-foreground">I'll handle grocery shopping</p>
                </div>
              </div>
              <Switch
                checked={data.includesGroceries}
                onCheckedChange={(checked) => onUpdate({ includesGroceries: checked })}
              />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Customizable</p>
                  <p className="text-xs text-muted-foreground">Allow menu modifications</p>
                </div>
              </div>
              <Switch
                checked={data.customizable}
                onCheckedChange={(checked) => onUpdate({ customizable: checked })}
              />
            </div>
          </Card>
        </div>

        {/* Pricing Summary */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-3">Pricing Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Base Service</span>
                <span className="font-semibold">${data.price}</span>
              </div>
              {data.includesGroceries && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">+ Grocery costs</span>
                  <Badge variant="outline" className="text-xs">Variable</Badge>
                </div>
              )}
              <div className="pt-2 border-t flex justify-between items-center">
                <span className="font-medium">Per Service Rate</span>
                <span className="text-lg font-bold text-primary">${data.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
