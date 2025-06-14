
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ServiceOnboardingData, SERVICE_CATEGORIES } from '@/types/serviceOnboarding';
import { DollarSign, Clock, Users, Calendar, RefreshCw, CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  data: ServiceOnboardingData;
  onUpdate: (updates: Partial<ServiceOnboardingData>) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ data, onUpdate }) => {
  const categoryInfo = SERVICE_CATEGORIES.find(cat => cat.id === data.category);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Service</h3>
        <p className="text-muted-foreground text-sm">Make sure everything looks good before adding to your services</p>
      </div>

      {/* Service Preview Card */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{categoryInfo?.icon}</div>
              <div>
                <CardTitle className="text-lg">{data.name}</CardTitle>
                <Badge variant="outline" className="mt-1 capitalize">
                  {data.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${data.price}</div>
              <div className="text-xs text-muted-foreground">per service</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{data.description}</p>
          
          {/* Service Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{data.duration} minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Up to {data.maxGuests} guests</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{data.advanceBooking}h advance notice</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <span>{data.cancellationPolicy.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Service Options */}
          <div className="flex flex-wrap gap-2">
            {data.includesGroceries && (
              <Badge variant="secondary" className="text-xs">Includes Groceries</Badge>
            )}
            {data.customizable && (
              <Badge variant="secondary" className="text-xs">Customizable</Badge>
            )}
          </div>

          {data.availabilityNotes && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-sm mb-1">Availability Notes</h5>
              <p className="text-sm text-muted-foreground">{data.availabilityNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Make Service Active</p>
              <p className="text-xs text-muted-foreground">Start accepting bookings immediately</p>
            </div>
          </div>
          <Switch
            checked={data.isActive}
            onCheckedChange={(checked) => onUpdate({ isActive: checked })}
          />
        </div>
      </Card>

      {/* Success Message */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium text-sm">Ready to add!</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Your service is ready to be added to your profile. Clients will be able to book this service once it's active.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
