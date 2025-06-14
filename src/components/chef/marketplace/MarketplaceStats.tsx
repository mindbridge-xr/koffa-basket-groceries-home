
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Star, Users, Award } from 'lucide-react';
import { Chef } from '@/types/chef';

interface MarketplaceStatsProps {
  chefs: Chef[];
}

export const MarketplaceStats: React.FC<MarketplaceStatsProps> = ({ chefs }) => {
  const stats = {
    totalChefs: chefs.length,
    avgRating: (chefs.reduce((sum, chef) => sum + chef.rating, 0) / chefs.length).toFixed(1),
    totalBookings: chefs.reduce((sum, chef) => sum + chef.totalBookings, 0),
    verifiedChefs: chefs.filter(chef => chef.isVerified).length
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="card-familyhub">
        <CardContent className="p-4 text-center">
          <ChefHat className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-xl font-bold text-foreground font-poppins">{stats.totalChefs}</div>
          <div className="text-xs text-muted-foreground font-inter">Professional Chefs</div>
        </CardContent>
      </Card>
      
      <Card className="card-familyhub">
        <CardContent className="p-4 text-center">
          <Star className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
          <div className="text-xl font-bold text-foreground font-poppins">{stats.avgRating}★</div>
          <div className="text-xs text-muted-foreground font-inter">Average Rating</div>
        </CardContent>
      </Card>
      
      <Card className="card-familyhub">
        <CardContent className="p-4 text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-xl font-bold text-foreground font-poppins">{stats.totalBookings}</div>
          <div className="text-xs text-muted-foreground font-inter">Happy Bookings</div>
        </CardContent>
      </Card>
      
      <Card className="card-familyhub">
        <CardContent className="p-4 text-center">
          <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="text-xl font-bold text-foreground font-poppins">{stats.verifiedChefs}</div>
          <div className="text-xs text-muted-foreground font-inter">Verified Chefs</div>
        </CardContent>
      </Card>
    </div>
  );
};
