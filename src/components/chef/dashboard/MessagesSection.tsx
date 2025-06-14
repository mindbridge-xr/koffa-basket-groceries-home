
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export const MessagesSection: React.FC = () => {
  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="flex items-center font-poppins">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">Message Center</h3>
        <p className="text-sm text-muted-foreground font-inter">Customer communication hub coming soon!</p>
      </CardContent>
    </Card>
  );
};
