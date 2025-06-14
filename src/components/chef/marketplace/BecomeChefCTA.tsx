
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

interface BecomeChefCTAProps {
  onJoinClick: () => void;
}

export const BecomeChefCTA: React.FC<BecomeChefCTAProps> = ({ onJoinClick }) => {
  return (
    <Card className="card-familyhub bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <CardContent className="p-6 text-center">
        <ChefHat className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">
          Are You a Chef?
        </h3>
        <p className="text-muted-foreground mb-4 font-inter">
          Join our marketplace and connect with food-loving families in your area.
        </p>
        <Button 
          className="btn-primary"
          onClick={onJoinClick}
        >
          Learn More About Joining
        </Button>
      </CardContent>
    </Card>
  );
};
