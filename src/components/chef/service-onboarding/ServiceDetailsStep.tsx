
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceOnboardingData } from '@/types/serviceOnboarding';
import { Clock, Users } from 'lucide-react';

interface ServiceDetailsStepProps {
  data: ServiceOnboardingData;
  onUpdate: (updates: Partial<ServiceOnboardingData>) => void;
}

export const ServiceDetailsStep: React.FC<ServiceDetailsStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Service Details</h3>
        <p className="text-muted-foreground text-sm">Provide the essential information about your service</p>
      </div>

      <div className="space-y-4">
        {/* Service Name */}
        <div className="space-y-2">
          <Label htmlFor="serviceName" className="text-sm font-medium">Service Name *</Label>
          <Input
            id="serviceName"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Fresh Pasta Making Class"
            className="w-full"
          />
        </div>

        {/* Service Description */}
        <div className="space-y-2">
          <Label htmlFor="serviceDescription" className="text-sm font-medium">Description *</Label>
          <Textarea
            id="serviceDescription"
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe what clients can expect from this service..."
            className="w-full min-h-[100px] resize-none"
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            {data.description.length}/500 characters
          </p>
        </div>

        {/* Duration and Max Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label htmlFor="duration" className="text-sm font-medium">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={data.duration}
                  onChange={(e) => onUpdate({ duration: parseInt(e.target.value) || 0 })}
                  min="30"
                  max="480"
                  step="30"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <Label htmlFor="maxGuests" className="text-sm font-medium">Max Guests *</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  value={data.maxGuests}
                  onChange={(e) => onUpdate({ maxGuests: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="20"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Service Preview */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-3">Service Preview</h4>
            <div className="space-y-2">
              <h5 className="font-semibold text-base">{data.name || 'Service Name'}</h5>
              <p className="text-sm text-muted-foreground">
                {data.description || 'Service description will appear here...'}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{data.duration} min</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Up to {data.maxGuests} guests</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
