
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceOnboardingData } from '@/types/serviceOnboarding';
import { Calendar, Clock, RefreshCw } from 'lucide-react';

interface AvailabilityStepProps {
  data: ServiceOnboardingData;
  onUpdate: (updates: Partial<ServiceOnboardingData>) => void;
}

export const AvailabilityStep: React.FC<AvailabilityStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Availability & Policies</h3>
        <p className="text-muted-foreground text-sm">Set your booking requirements and policies</p>
      </div>

      <div className="space-y-6">
        {/* Advance Booking */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Advance Booking</h4>
              <p className="text-xs text-muted-foreground">Minimum notice required</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="number"
                value={data.advanceBooking}
                onChange={(e) => onUpdate({ advanceBooking: parseInt(e.target.value) || 0 })}
                min="1"
                max="168"
                className="pr-16"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                hours
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Clients must book at least {data.advanceBooking} hours in advance
            </p>
          </div>
        </Card>

        {/* Cancellation Policy */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <RefreshCw className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Cancellation Policy</h4>
              <p className="text-xs text-muted-foreground">When clients can cancel</p>
            </div>
          </div>
          
          <Select value={data.cancellationPolicy} onValueChange={(value) => onUpdate({ cancellationPolicy: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select cancellation policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24-hour">24 hours notice</SelectItem>
              <SelectItem value="48-hour">48 hours notice</SelectItem>
              <SelectItem value="72-hour">72 hours notice</SelectItem>
              <SelectItem value="1-week">1 week notice</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Availability Notes */}
        <div className="space-y-2">
          <Label htmlFor="availabilityNotes" className="text-sm font-medium">
            Availability Notes (Optional)
          </Label>
          <Textarea
            id="availabilityNotes"
            value={data.availabilityNotes}
            onChange={(e) => onUpdate({ availabilityNotes: e.target.value })}
            placeholder="e.g., Available weekends only, prefer morning bookings, holiday restrictions..."
            className="min-h-[80px] resize-none"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Help clients understand when you're typically available
          </p>
        </div>

        {/* Summary */}
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-3">Booking Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span>Minimum {data.advanceBooking} hours advance notice</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-3 w-3 text-muted-foreground" />
                <span>
                  {data.cancellationPolicy === 'flexible' 
                    ? 'Flexible cancellation'
                    : `${data.cancellationPolicy.replace('-', ' ')} cancellation`
                  }
                </span>
              </div>
              {data.availabilityNotes && (
                <div className="flex items-start space-x-2 pt-2 border-t">
                  <Calendar className="h-3 w-3 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{data.availabilityNotes}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
