
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign } from 'lucide-react';
import { OnboardingFormData, ONBOARDING_CONSTANTS } from '@/types/onboarding';
import { toggleArrayItem } from '@/utils/onboardingValidation';

interface ServicesPricingStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const ServicesPricingStep: React.FC<ServicesPricingStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Services & Pricing"
      description="What services will you offer and at what rates?"
      currentStep={4}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <Label className="font-inter font-medium">Services You'll Offer *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {ONBOARDING_CONSTANTS.serviceTypeOptions.map(service => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={profileData.serviceTypes.includes(service)}
                  onCheckedChange={() => toggleArrayItem(
                    profileData.serviceTypes, 
                    service, 
                    (value) => setProfileData(prev => ({ ...prev, serviceTypes: value }))
                  )}
                />
                <Label htmlFor={service} className="text-sm font-inter cursor-pointer">
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rate" className="font-inter font-medium">Base Hourly Rate *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="rate"
                type="number"
                min="25"
                max="200"
                placeholder="50"
                className="input-familyhub pl-10"
                value={profileData.hourlyRate}
                onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-inter">
              Minimum $25/hour. You can create custom pricing for different services.
            </p>
          </div>

          <div>
            <Label htmlFor="travel" className="font-inter font-medium">Travel Distance (miles)</Label>
            <Input
              id="travel"
              type="number"
              min="1"
              max="50"
              placeholder="10"
              className="input-familyhub"
              value={profileData.travelDistance}
              onChange={(e) => setProfileData(prev => ({ ...prev, travelDistance: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="availability" className="font-inter font-medium">General Availability</Label>
          <Textarea
            id="availability"
            placeholder="Describe your general availability (e.g., 'Weekdays after 5pm, weekends anytime', 'Flexible schedule', etc.)"
            className="input-familyhub min-h-20 resize-none"
            value={profileData.availability}
            onChange={(e) => setProfileData(prev => ({ ...prev, availability: e.target.value }))}
          />
        </div>
      </div>
    </OnboardingStep>
  );
};
