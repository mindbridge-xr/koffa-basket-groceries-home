
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { PageHeader } from '@/components/PageHeader';
import { PersonalInfoStep } from '@/components/chef/onboarding/PersonalInfoStep';
import { ProfessionalBackgroundStep } from '@/components/chef/onboarding/ProfessionalBackgroundStep';
import { SpecialtiesStep } from '@/components/chef/onboarding/SpecialtiesStep';
import { ServicesPricingStep } from '@/components/chef/onboarding/ServicesPricingStep';
import { PortfolioStep } from '@/components/chef/onboarding/PortfolioStep';
import { FinalReviewStep } from '@/components/chef/onboarding/FinalReviewStep';
import { OnboardingFormData } from '@/types/onboarding';
import { canContinueStep } from '@/utils/onboardingValidation';
import { Chef } from '@/types/chef';

export const ChefOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { becomeChef, setIsChef } = useChef();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [profileData, setProfileData] = useState<OnboardingFormData>({
    // Step 1: Personal Information
    name: '',
    email: '',
    phone: '',
    location: '',
    
    // Step 2: Professional Background
    bio: '',
    experienceLevel: 'home-cook' as Chef['experienceLevel'],
    yearsExperience: 0,
    previousRoles: '',
    
    // Step 3: Specialties & Cuisine
    specialties: [],
    cuisineTypes: [],
    dietarySpecializations: [],
    
    // Step 4: Services & Pricing
    serviceTypes: [],
    hourlyRate: 50,
    travelDistance: 10,
    availability: '',
    
    // Step 5: Portfolio & Credentials
    certifications: [],
    portfolioDescription: '',
    instagramHandle: '',
    
    // Step 6: Final Details
    agreesToTerms: false,
    wantsInsurance: false,
    hasTransportation: true
  });

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/chef-welcome');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const completeProfile = {
        ...profileData,
        isVerified: false,
        services: [
          {
            id: 'service-1',
            name: 'Personal Chef Service',
            description: 'Professional cooking service for your home',
            duration: 180,
            price: profileData.hourlyRate * 3,
            category: 'private-chef' as const,
            maxGuests: 6,
            includesGroceries: false,
            customizable: true
          }
        ],
        availability: [],
        portfolio: [],
        recipes: [],
        reviews: []
      };

      setIsChef(true);
      becomeChef(completeProfile);
      
      setTimeout(() => {
        navigate('/chef-dashboard');
      }, 100);
      
    } catch (error) {
      console.error('Error creating chef profile:', error);
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      profileData,
      setProfileData,
      canContinue: canContinueStep(step, profileData),
      onNext: handleNext,
      onBack: handleBack
    };

    switch (step) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <ProfessionalBackgroundStep {...stepProps} />;
      case 3:
        return <SpecialtiesStep {...stepProps} />;
      case 4:
        return <ServicesPricingStep {...stepProps} />;
      case 5:
        return <PortfolioStep {...stepProps} />;
      case 6:
        return <FinalReviewStep {...stepProps} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Chef Application"
        subtitle="Join our marketplace of culinary professionals"
        showBack={true}
        onBack={handleBack}
      />

      <div className="mobile-spacing py-6">
        {renderStepContent()}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefOnboarding;
