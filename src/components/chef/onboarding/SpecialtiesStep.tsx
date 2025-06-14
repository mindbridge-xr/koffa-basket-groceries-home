
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { OnboardingFormData, ONBOARDING_CONSTANTS } from '@/types/onboarding';
import { toggleArrayItem } from '@/utils/onboardingValidation';

interface SpecialtiesStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const SpecialtiesStep: React.FC<SpecialtiesStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Specialties & Cuisines"
      description="What are you passionate about cooking?"
      currentStep={3}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <Label className="font-inter font-medium">Cooking Specialties (Select at least 3) *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {ONBOARDING_CONSTANTS.specialtyOptions.map(specialty => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  checked={profileData.specialties.includes(specialty)}
                  onCheckedChange={() => toggleArrayItem(
                    profileData.specialties, 
                    specialty, 
                    (value) => setProfileData(prev => ({ ...prev, specialties: value }))
                  )}
                />
                <Label htmlFor={specialty} className="text-sm font-inter cursor-pointer">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="font-inter font-medium">Cuisine Types (Select at least 2) *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {ONBOARDING_CONSTANTS.cuisineOptions.map(cuisine => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox
                  id={cuisine}
                  checked={profileData.cuisineTypes.includes(cuisine)}
                  onCheckedChange={() => toggleArrayItem(
                    profileData.cuisineTypes, 
                    cuisine, 
                    (value) => setProfileData(prev => ({ ...prev, cuisineTypes: value }))
                  )}
                />
                <Label htmlFor={cuisine} className="text-sm font-inter cursor-pointer">
                  {cuisine}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="font-inter font-medium">Dietary Specializations (Optional)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {ONBOARDING_CONSTANTS.dietaryOptions.map(diet => (
              <div key={diet} className="flex items-center space-x-2">
                <Checkbox
                  id={diet}
                  checked={profileData.dietarySpecializations.includes(diet)}
                  onCheckedChange={() => toggleArrayItem(
                    profileData.dietarySpecializations, 
                    diet, 
                    (value) => setProfileData(prev => ({ ...prev, dietarySpecializations: value }))
                  )}
                />
                <Label htmlFor={diet} className="text-sm font-inter cursor-pointer">
                  {diet}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OnboardingStep>
  );
};
