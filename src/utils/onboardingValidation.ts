
import { OnboardingFormData } from '@/types/onboarding';

export const canContinueStep = (stepNumber: number, profileData: OnboardingFormData): boolean => {
  switch (stepNumber) {
    case 1: 
      return !!(profileData.name && profileData.email && profileData.phone && profileData.location);
    case 2: 
      return !!(profileData.bio && profileData.previousRoles);
    case 3: 
      return profileData.specialties.length > 0 && profileData.cuisineTypes.length > 0;
    case 4: 
      return profileData.serviceTypes.length > 0 && profileData.hourlyRate >= 25;
    case 5: 
      return !!profileData.portfolioDescription;
    case 6: 
      return profileData.agreesToTerms;
    default: 
      return false;
  }
};

export const toggleArrayItem = (
  array: string[], 
  item: string, 
  setter: (value: string[]) => void
) => {
  setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
};
