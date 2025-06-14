
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Check, 
  X, 
  Phone, 
  MessageSquare,
  Star,
  MapPin,
  Users
} from 'lucide-react';

interface SmartBookingCardProps {
  booking: any;
  chefProfile: any;
  onAccept: (bookingId: string) => void;
  onDecline: (bookingId: string) => void;
}

export const SmartBookingCard: React.FC<SmartBookingCardProps> = ({ 
  booking, 
  chefProfile, 
  onAccept, 
  onDecline 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAccept(booking.id);
      toast({
        title: "Booking Accepted!",
        description: "The customer has been notified.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      await onDecline(booking.id);
      toast({
        title: "Booking Declined",
        description: "The customer has been notified.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const service = chefProfile.services.find((s: any) => s.id === booking.serviceId);

  return (
    <Card className="card-familyhub overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="Customer" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-base text-foreground font-poppins">
                  John Doe
                </h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>4.9</span>
                  <span>•</span>
                  <span>12 bookings</span>
                </div>
              </div>
            </div>
            
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{booking.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{booking.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">${booking.totalPrice}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{booking.guestCount || 2} guests</span>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="p-4 border-t border-gray-100">
          <h5 className="font-medium text-foreground mb-2 font-poppins">
            {service?.name || 'Custom Service'}
          </h5>
          <p className="text-sm text-muted-foreground mb-3 font-inter">
            {service?.description || 'Custom cooking service'}
          </p>
          
          {booking.specialRequests && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
              <p className="text-sm text-amber-800 font-medium mb-1">Special Requests:</p>
              <p className="text-sm text-amber-700">{booking.specialRequests}</p>
            </div>
          )}

          {booking.dietaryRestrictions && booking.dietaryRestrictions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {booking.dietaryRestrictions.map((restriction: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {restriction}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {booking.status === 'pending' && (
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex space-x-2">
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                disabled={isProcessing}
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" />
                Decline
              </Button>
              
              <Button
                size="sm"
                disabled={isProcessing}
                className="flex-1"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              
              <Button
                onClick={handleAccept}
                size="sm"
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
            </div>
          </div>
        )}

        {booking.status === 'confirmed' && (
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              
              <Button variant="outline" size="sm" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
              
              <Button size="sm" className="flex-1">
                <MapPin className="h-4 w-4 mr-1" />
                Navigate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
