
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KoffaLogo } from '@/components/KoffaLogo';
import { Button } from '@/components/ui/button';

export const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Welcome to Koffa',
      description: 'Your family grocery management app',
      image: '/lovable-uploads/bdb9f2ed-22a2-40aa-8476-f1681c0b1f4d.png'
    },
    {
      title: 'Create Shopping Lists',
      description: 'Organize your items by categories and shop efficiently',
      image: '/lovable-uploads/756b30b7-7e84-4d1e-b608-8a9727e446c6.png'
    },
    {
      title: 'Share With Family',
      description: 'Share lists with family members and collaborate in real-time',
      image: '/lovable-uploads/ad19043e-44a6-42cd-ae4f-d63c4fdf7b3f.png'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-koffa-snow-drift">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-fade-in text-center mb-8">
          {currentStep === 0 ? (
            <KoffaLogo size="lg" />
          ) : (
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="h-64 w-auto mx-auto mb-6"
            />
          )}
          <h1 className="text-3xl font-bold mt-6 text-koffa-heavy-metal">
            {steps[currentStep].title}
          </h1>
          <p className="text-lg mt-3 text-gray-600 max-w-md mx-auto">
            {steps[currentStep].description}
          </p>
        </div>
        
        <div className="flex justify-center gap-1 my-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-koffa-aqua-forest w-8' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6 pt-0 space-y-4">
        <Button
          className="w-full bg-koffa-aqua-forest hover:bg-koffa-aqua-forest/90"
          size="lg"
          onClick={handleNext}
        >
          {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
        </Button>
        
        {currentStep < steps.length - 1 && (
          <Button
            variant="ghost"
            className="w-full text-koffa-heavy-metal"
            onClick={handleSkip}
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
