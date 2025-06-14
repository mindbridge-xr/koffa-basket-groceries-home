
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { OnboardingFormData, ONBOARDING_CONSTANTS } from '@/types/onboarding';
import { toggleArrayItem } from '@/utils/onboardingValidation';

interface PortfolioStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const PortfolioStep: React.FC<PortfolioStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Portfolio & Credentials"
      description="Showcase your skills and qualifications"
      currentStep={5}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <Label className="font-inter font-medium">Certifications & Credentials</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {ONBOARDING_CONSTANTS.certificationOptions.map(cert => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={cert}
                  checked={profileData.certifications.includes(cert)}
                  onCheckedChange={() => toggleArrayItem(
                    profileData.certifications, 
                    cert, 
                    (value) => setProfileData(prev => ({ ...prev, certifications: value }))
                  )}
                />
                <Label htmlFor={cert} className="text-sm font-inter cursor-pointer">
                  {cert}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="portfolio" className="font-inter font-medium">Portfolio Description *</Label>
          <Textarea
            id="portfolio"
            placeholder="Describe your signature dishes, cooking style, memorable events you've catered, or any awards/recognition you've received..."
            className="input-familyhub min-h-32 resize-none"
            value={profileData.portfolioDescription}
            onChange={(e) => setProfileData(prev => ({ ...prev, portfolioDescription: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="instagram" className="font-inter font-medium">Instagram Handle (Optional)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-inter">@</span>
            <Input
              id="instagram"
              placeholder="yourhandle"
              className="input-familyhub pl-8"
              value={profileData.instagramHandle}
              onChange={(e) => setProfileData(prev => ({ ...prev, instagramHandle: e.target.value }))}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-inter">
            Showcase your food photography to attract more clients
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 font-poppins">Upload Portfolio Images</h4>
              <p className="text-sm text-blue-700 font-inter">
                After completing your application, you'll be able to upload photos of your dishes, 
                certifications, and professional headshots to complete your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingStep>
  );
};
