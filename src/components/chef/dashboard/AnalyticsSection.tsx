
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="flex items-center font-poppins">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">Advanced Analytics</h3>
        <p className="text-sm text-muted-foreground font-inter">Detailed analytics coming soon!</p>
      </CardContent>
    </Card>
  );
};
