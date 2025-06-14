
import { ServiceOnboardingData } from '@/types/serviceOnboarding';

export const canContinueServiceStep = (stepNumber: number, serviceData: ServiceOnboardingData): boolean => {
  switch (stepNumber) {
    case 1: 
      return !!(serviceData.category && serviceData.template);
    case 2: 
      return !!(serviceData.name && serviceData.description && serviceData.duration > 0);
    case 3: 
      return serviceData.price > 0;
    case 4: 
      return serviceData.advanceBooking > 0;
    case 5: 
      return true; // Review step, always can continue
    default: 
      return false;
  }
};

export const getServiceStepTitle = (stepNumber: number): string => {
  switch (stepNumber) {
    case 1: return 'Service Type';
    case 2: return 'Service Details';
    case 3: return 'Pricing';
    case 4: return 'Availability';
    case 5: return 'Review';
    default: return 'Unknown Step';
  }
};

export const validateServiceData = (serviceData: ServiceOnboardingData) => {
  const errors: string[] = [];
  
  if (!serviceData.category) errors.push('Service category is required');
  if (!serviceData.name) errors.push('Service name is required');
  if (!serviceData.description) errors.push('Service description is required');
  if (serviceData.duration <= 0) errors.push('Duration must be greater than 0');
  if (serviceData.price <= 0) errors.push('Price must be greater than 0');
  if (serviceData.maxGuests <= 0) errors.push('Max guests must be greater than 0');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
