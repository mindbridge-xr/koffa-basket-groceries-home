
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { ServiceOnboardingData } from '@/types/serviceOnboarding';
import { canContinueServiceStep, getServiceStepTitle, validateServiceData } from '@/utils/serviceOnboardingValidation';
import { ServiceTypeStep } from './ServiceTypeStep';
import { ServiceDetailsStep } from './ServiceDetailsStep';
import { PricingStep } from './PricingStep';
import { AvailabilityStep } from './AvailabilityStep';
import { ReviewStep } from './ReviewStep';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddService: (serviceData: any) => void;
  chefProfile: any;
}

export const AddServiceDialog: React.FC<AddServiceDialogProps> = ({
  open,
  onOpenChange,
  onAddService,
  chefProfile
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceOnboardingData>({
    category: '',
    template: '',
    name: '',
    description: '',
    duration: 120,
    maxGuests: 4,
    price: 100,
    includesGroceries: false,
    customizable: true,
    groceryBudgetRange: '50-100',
    availabilityNotes: '',
    advanceBooking: 24,
    cancellationPolicy: '24-hour',
    isActive: true
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const totalSteps = 5;

  const updateServiceData = (updates: Partial<ServiceOnboardingData>) => {
    setServiceData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (canContinueServiceStep(currentStep, serviceData)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const validation = validateServiceData(serviceData);
    
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    const newService = {
      id: Date.now().toString(),
      name: serviceData.name,
      description: serviceData.description,
      duration: serviceData.duration,
      price: serviceData.price,
      category: serviceData.category,
      maxGuests: serviceData.maxGuests,
      includesGroceries: serviceData.includesGroceries,
      customizable: serviceData.customizable,
      active: serviceData.isActive
    };

    onAddService(newService);
    
    toast({
      title: "Service Added!",
      description: `${serviceData.name} has been added to your services.`
    });

    // Reset form and close dialog
    setCurrentStep(1);
    setServiceData({
      category: '',
      template: '',
      name: '',
      description: '',
      duration: 120,
      maxGuests: 4,
      price: 100,
      includesGroceries: false,
      customizable: true,
      groceryBudgetRange: '50-100',
      availabilityNotes: '',
      advanceBooking: 24,
      cancellationPolicy: '24-hour',
      isActive: true
    });
    onOpenChange(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ServiceTypeStep data={serviceData} onUpdate={updateServiceData} />;
      case 2:
        return <ServiceDetailsStep data={serviceData} onUpdate={updateServiceData} />;
      case 3:
        return <PricingStep data={serviceData} onUpdate={updateServiceData} chefProfile={chefProfile} />;
      case 4:
        return <AvailabilityStep data={serviceData} onUpdate={updateServiceData} />;
      case 5:
        return <ReviewStep data={serviceData} onUpdate={updateServiceData} />;
      default:
        return null;
    }
  };

  const canContinue = canContinueServiceStep(currentStep, serviceData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'h-[90vh] max-w-[95vw]' : 'max-w-2xl h-[80vh]'} flex flex-col`}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Add New Service</span>
          </DialogTitle>
          
          {/* Progress Bar */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{getServiceStepTitle(currentStep)}</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
        </DialogHeader>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex-shrink-0 flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canContinue}
              className="flex items-center space-x-2 btn-primary"
            >
              <span>{currentStep === totalSteps ? 'Add Service' : 'Next'}</span>
              {currentStep < totalSteps && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
