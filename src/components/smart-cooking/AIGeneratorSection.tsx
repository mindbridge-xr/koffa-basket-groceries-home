
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface AIGeneratorSectionProps {
  onGenerateRecipe: () => void;
  isGenerating: boolean;
}

export const AIGeneratorSection: React.FC<AIGeneratorSectionProps> = ({
  onGenerateRecipe,
  isGenerating
}) => {
  return (
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="flex items-center font-poppins">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          AI Recipe Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 font-inter">
          Generate custom recipes using ingredients from your shopping lists
        </p>
        <Button
          onClick={onGenerateRecipe}
          disabled={isGenerating}
          className="w-full btn-primary"
        >
          {isGenerating ? 'Generating Recipe...' : 'Generate Family Recipe'}
        </Button>
      </CardContent>
    </Card>
  );
};
