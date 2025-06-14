
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  canContinue: boolean;
  isSubmitting?: boolean;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  backLabel?: string;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  canContinue,
  isSubmitting = false,
  onNext,
  onBack,
  nextLabel = 'Continue',
  backLabel = 'Back'
}) => {
  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground font-inter">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary font-inter">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card className="card-familyhub">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground font-poppins">
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground font-inter">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {backLabel}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canContinue || isSubmitting}
          className="btn-primary flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              {nextLabel}
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
