
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSplash } from '@/components/AnimatedSplash';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Users, ShoppingCart, Calendar, ChefHat } from 'lucide-react';

const Onboarding = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [familyName, setFamilyName] = useState('');
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const steps = [
    {
      title: "Welcome to FamilyHub",
      subtitle: "Your family's digital command center",
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto">
            <span className="text-5xl font-bold text-white font-poppins">F</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-poppins">Organize your family life</h2>
            <p className="text-muted-foreground font-inter">
              Manage shopping lists, schedule activities, book services, and keep everyone connected.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What can you do?",
      subtitle: "Discover FamilyHub's features",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              { icon: ShoppingCart, title: "Smart Shopping Lists", desc: "Collaborative grocery and task lists" },
              { icon: Calendar, title: "Family Schedule", desc: "Coordinate events and activities" },
              { icon: ChefHat, title: "Chef Services", desc: "Book professional cooking services" },
              { icon: Users, title: "Family Circle", desc: "Manage family members and roles" }
            ].map((feature, index) => (
              <div key={index} className="card-familyhub p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-poppins">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-inter">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Setup your family",
      subtitle: "Let's get started",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2 font-poppins">What should we call your family?</h2>
            <p className="text-muted-foreground font-inter">This will be displayed throughout the app</p>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="e.g., The Johnson Family"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="input-familyhub text-center text-lg"
            />
            <p className="text-sm text-muted-foreground text-center font-inter">
              You can change this later in settings
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      localStorage.setItem('familyName', familyName);
      navigate('/auth');
    }
  };

  if (showSplash) {
    return <AnimatedSplash onComplete={handleSplashComplete} duration={2500} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex flex-col">
      {/* Progress */}
      <div className="mobile-padding">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-inter">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center mobile-padding">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2 font-poppins">
              {steps[currentStep].title}
            </h1>
            <p className="text-muted-foreground font-inter">
              {steps[currentStep].subtitle}
            </p>
          </div>
          
          <div className="space-y-6">
            {steps[currentStep].content}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mobile-padding">
        <div className="flex space-x-4">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn-secondary flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1 && !familyName.trim()}
            className="btn-primary flex-1"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
