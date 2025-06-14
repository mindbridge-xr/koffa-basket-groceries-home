
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingFormData } from '@/types/onboarding';

interface PersonalInfoStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Personal Information"
      description="Let's start with your basic information"
      currentStep={1}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="font-inter">Full Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              className="input-familyhub"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="font-inter">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="chef@example.com"
              className="input-familyhub"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="font-inter">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className="input-familyhub"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="font-inter">Location *</Label>
            <Input
              id="location"
              placeholder="City, State"
              className="input-familyhub"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </OnboardingStep>
  );
};
