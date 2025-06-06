
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShoppingCart, Calendar, ChefHat, Bell, Target, ArrowRight, Check } from 'lucide-react';

interface SmartOnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

interface OnboardingData {
  familyName: string;
  familySize: string;
  interests: string[];
  notifications: boolean;
  primaryUse: string;
}

export const SmartOnboarding: React.FC<SmartOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    familyName: '',
    familySize: '2-4',
    interests: [],
    notifications: true,
    primaryUse: 'grocery'
  });

  const steps = [
    {
      title: "Welcome to FamilyHub",
      subtitle: "Let's set up your family's digital command center",
      component: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <span className="text-4xl">🧺</span>
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-poppins">
              Organize your family life effortlessly
            </h2>
            <p className="text-muted-foreground font-inter leading-relaxed">
              From grocery lists to chef bookings, family scheduling to task management - 
              we'll help you keep everything in perfect harmony.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Tell us about your family",
      subtitle: "This helps us personalize your experience",
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                What should we call your family?
              </label>
              <Input
                placeholder="e.g., The Johnson Family"
                value={data.familyName}
                onChange={(e) => setData({...data, familyName: e.target.value})}
                className="input-familyhub text-center text-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                How many people in your family?
              </label>
              <Select value={data.familySize} onValueChange={(value) => setData({...data, familySize: value})}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="2">2 people</SelectItem>
                  <SelectItem value="3-4">3-4 people</SelectItem>
                  <SelectItem value="5-6">5-6 people</SelectItem>
                  <SelectItem value="7+">7+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What interests you most?",
      subtitle: "Select all that apply - we'll customize your experience",
      component: (
        <div className="space-y-4">
          {[
            { id: 'grocery', icon: ShoppingCart, title: 'Smart Grocery Lists', desc: 'Collaborative shopping & meal planning' },
            { id: 'chef', icon: ChefHat, title: 'Chef Services', desc: 'Book professional cooking experiences' },
            { id: 'schedule', icon: Calendar, title: 'Family Schedule', desc: 'Coordinate events & activities' },
            { id: 'tasks', icon: Target, title: 'Task Management', desc: 'Organize family responsibilities' }
          ].map((interest) => (
            <Card 
              key={interest.id}
              className={`cursor-pointer transition-all ${
                data.interests.includes(interest.id) 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => {
                const newInterests = data.interests.includes(interest.id)
                  ? data.interests.filter(i => i !== interest.id)
                  : [...data.interests, interest.id];
                setData({...data, interests: newInterests});
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    data.interests.includes(interest.id) ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}>
                    <interest.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground font-poppins">{interest.title}</h3>
                    <p className="text-sm text-muted-foreground font-inter">{interest.desc}</p>
                  </div>
                  {data.interests.includes(interest.id) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    },
    {
      title: "Final touches",
      subtitle: "Set your preferences to get started",
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 font-inter">
              What will you use FamilyHub for primarily?
            </label>
            <Select value={data.primaryUse} onValueChange={(value) => setData({...data, primaryUse: value})}>
              <SelectTrigger className="input-familyhub">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grocery">Grocery shopping & meal planning</SelectItem>
                <SelectItem value="chef">Booking chef services</SelectItem>
                <SelectItem value="schedule">Family scheduling</SelectItem>
                <SelectItem value="all">Everything - complete family management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox 
              id="notifications"
              checked={data.notifications}
              onCheckedChange={(checked) => setData({...data, notifications: !!checked})}
            />
            <div className="flex-1">
              <label htmlFor="notifications" className="font-medium text-foreground font-poppins cursor-pointer">
                Enable smart notifications
              </label>
              <p className="text-sm text-muted-foreground font-inter">
                Get helpful reminders and family updates
              </p>
            </div>
            <Bell className="h-5 w-5 text-primary" />
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2 font-poppins">🎉 You're all set!</h4>
            <p className="text-sm text-muted-foreground font-inter">
              Based on your choices, we've prepared some starter templates and suggestions to help you get organized right away.
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
      onComplete(data);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.familyName.trim().length > 0;
      case 2:
        return data.interests.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex flex-col">
      {/* Progress */}
      <div className="mobile-padding pt-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: index <= currentStep ? 1 : 0.8,
                  backgroundColor: index <= currentStep ? '#3B82F6' : '#E5E7EB'
                }}
                transition={{ duration: 0.3 }}
                className={`h-2 w-8 rounded-full`}
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
        <div className="max-w-md mx-auto w-full">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2 font-poppins">
                {steps[currentStep].title}
              </h1>
              <p className="text-muted-foreground font-inter">
                {steps[currentStep].subtitle}
              </p>
            </div>
            
            <div>
              {steps[currentStep].component}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Actions */}
      <div className="mobile-padding pb-8">
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
            disabled={!canProceed()}
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
