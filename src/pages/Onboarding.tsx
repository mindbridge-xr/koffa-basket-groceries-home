
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartOnboarding } from '@/components/SmartOnboarding';
import { AnimatedSplash } from '@/components/AnimatedSplash';

interface OnboardingData {
  familyName: string;
  familySize: string;
  interests: string[];
  notifications: boolean;
  primaryUse: string;
}

const Onboarding = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    // Store onboarding data
    localStorage.setItem('familyName', data.familyName);
    localStorage.setItem('familySize', data.familySize);
    localStorage.setItem('familyInterests', JSON.stringify(data.interests));
    localStorage.setItem('notificationsEnabled', JSON.stringify(data.notifications));
    localStorage.setItem('primaryUse', data.primaryUse);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    console.log('Onboarding completed with data:', data);
    navigate('/auth');
  };

  if (showSplash) {
    return <AnimatedSplash onComplete={handleSplashComplete} duration={2500} />;
  }

  return <SmartOnboarding onComplete={handleOnboardingComplete} />;
};

export default Onboarding;
