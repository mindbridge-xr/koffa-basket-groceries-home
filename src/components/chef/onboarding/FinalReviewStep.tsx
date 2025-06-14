
import React from 'react';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { OnboardingFormData } from '@/types/onboarding';

interface FinalReviewStepProps {
  profileData: OnboardingFormData;
  setProfileData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  canContinue: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const FinalReviewStep: React.FC<FinalReviewStepProps> = ({
  profileData,
  setProfileData,
  canContinue,
  isSubmitting,
  onNext,
  onBack
}) => {
  return (
    <OnboardingStep
      title="Final Review & Agreement"
      description="Review your information and agree to our terms"
      currentStep={6}
      totalSteps={6}
      canContinue={canContinue}
      onNext={onNext}
      onBack={onBack}
      nextLabel="Complete Application"
      isSubmitting={isSubmitting}
    >
      <div className="space-y-6">
        {/* Profile Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3 font-poppins">Profile Summary</h4>
          <div className="space-y-2 text-sm font-inter">
            <div><span className="font-medium">Name:</span> {profileData.name}</div>
            <div><span className="font-medium">Location:</span> {profileData.location}</div>
            <div><span className="font-medium">Experience:</span> {profileData.experienceLevel.replace('-', ' ')} ({profileData.yearsExperience} years)</div>
            <div><span className="font-medium">Hourly Rate:</span> ${profileData.hourlyRate}/hour</div>
            <div><span className="font-medium">Specialties:</span> {profileData.specialties.slice(0, 3).join(', ')}</div>
            <div><span className="font-medium">Cuisines:</span> {profileData.cuisineTypes.slice(0, 3).join(', ')}</div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="transportation"
              checked={profileData.hasTransportation}
              onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, hasTransportation: !!checked }))}
            />
            <Label htmlFor="transportation" className="font-inter">
              I have reliable transportation to reach client locations
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="insurance"
              checked={profileData.wantsInsurance}
              onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, wantsInsurance: !!checked }))}
            />
            <Label htmlFor="insurance" className="font-inter">
              I'm interested in liability insurance options (optional)
            </Label>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="border-t pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={profileData.agreesToTerms}
              onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, agreesToTerms: !!checked }))}
            />
            <Label htmlFor="terms" className="text-sm font-inter cursor-pointer">
              I agree to the Terms of Service, Privacy Policy, and Community Guidelines. 
              I understand that my application will be reviewed and I may be contacted for additional information.
            </Label>
          </div>
        </div>

        {/* Next Steps Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-primary mb-2 font-poppins">What's Next?</h4>
          <ul className="text-sm text-primary/80 space-y-1 font-inter">
            <li>• Application review (typically 24-48 hours)</li>
            <li>• Background check and verification</li>
            <li>• Profile activation and dashboard access</li>
            <li>• Start receiving booking requests!</li>
          </ul>
        </div>
      </div>
    </OnboardingStep>
  );
};
