
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { OnboardingFormData } from '@/types/onboarding';
import { Chef } from '@/types/chef';

interface ProfessionalBackgroundStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const ProfessionalBackgroundStep: React.FC<ProfessionalBackgroundStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Professional Background"
      description="Tell us about your culinary experience"
      currentStep={2}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <Label className="font-inter">Experience Level</Label>
          <RadioGroup 
            value={profileData.experienceLevel} 
            onValueChange={(value: Chef['experienceLevel']) => 
              setProfileData(prev => ({ ...prev, experienceLevel: value }))
            }
            className="mt-2"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home-cook" id="home-cook" />
                <Label htmlFor="home-cook" className="cursor-pointer font-inter">
                  <span className="font-medium">Home Cook</span> - Passionate about cooking at home
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="cursor-pointer font-inter">
                  <span className="font-medium">Professional Chef</span> - Restaurant or catering experience
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="culinary-trained" id="culinary-trained" />
                <Label htmlFor="culinary-trained" className="cursor-pointer font-inter">
                  <span className="font-medium">Culinary Trained</span> - Formal culinary education
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="years" className="font-inter">Years of Experience</Label>
            <Input
              id="years"
              type="number"
              min="0"
              max="50"
              className="input-familyhub"
              value={profileData.yearsExperience}
              onChange={(e) => setProfileData(prev => ({ ...prev, yearsExperience: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio" className="font-inter">Professional Bio *</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about your cooking journey, what drives your passion for food, and what makes you unique as a chef..."
            className="input-familyhub min-h-24 resize-none"
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="roles" className="font-inter">Previous Roles & Experience *</Label>
          <Textarea
            id="roles"
            placeholder="Describe your previous cooking roles, restaurants worked at, or relevant experience..."
            className="input-familyhub min-h-20 resize-none"
            value={profileData.previousRoles}
            onChange={(e) => setProfileData(prev => ({ ...prev, previousRoles: e.target.value }))}
          />
        </div>
      </div>
    </OnboardingStep>
  );
};
