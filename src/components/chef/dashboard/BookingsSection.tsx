
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartBookingCard } from './SmartBookingCard';
import { Calendar } from 'lucide-react';

interface BookingsSectionProps {
  bookings: any[];
  chefProfile: any;
  onAcceptBooking: (bookingId: string) => void;
  onDeclineBooking: (bookingId: string) => void;
}

export const BookingsSection: React.FC<BookingsSectionProps> = ({
  bookings,
  chefProfile,
  onAcceptBooking,
  onDeclineBooking
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground font-poppins">Smart Bookings</h3>
        <Badge variant="outline" className="bg-white/50">
          {bookings.length} total
        </Badge>
      </div>
      
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <SmartBookingCard
              key={booking.id}
              booking={booking}
              chefProfile={chefProfile}
              onAccept={onAcceptBooking}
              onDecline={onDeclineBooking}
            />
          ))}
        </div>
      ) : (
        <Card className="card-familyhub p-8 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No bookings yet</h3>
          <p className="text-sm text-muted-foreground font-inter">Your smart bookings will appear here once confirmed.</p>
        </Card>
      )}
    </div>
  );
};
