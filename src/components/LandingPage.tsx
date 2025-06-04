
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Shield, Users, ShoppingCart, ChefHat, Calendar, Bell, CheckCircle, Star } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useApp();

  const handleGetStarted = async () => {
    setIsLoading(true);
    // Simulate loading demo data
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const features = [
    {
      icon: Users,
      title: "Family Management",
      description: "Coordinate tasks and activities with all family members",
      color: "text-blue-500"
    },
    {
      icon: ShoppingCart,
      title: "Smart Shopping",
      description: "Collaborative grocery lists with intelligent suggestions",
      color: "text-green-500"
    },
    {
      icon: ChefHat,
      title: "Chef Services",
      description: "Book professional chefs for meals and cooking classes",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "Task Planning",
      description: "Organize household tasks with priorities and assignments",
      color: "text-purple-500"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated on family activities and important reminders",
      color: "text-yellow-500"
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Monitor completion of tasks and family goals",
      color: "text-green-600"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Enjoy a seamless, intuitive interface designed for families",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your family data is protected with enterprise-grade security",
      color: "text-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <div className="mobile-padding text-center pt-12">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl font-poppins">F</span>
        </div>
        
        <h1 className="font-bold text-3xl text-foreground mb-2 font-poppins">
          FamilyHub
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 font-inter">
          Smart Family Management & Chef Services
        </p>
      </div>

      {/* Features Grid */}
      <div className="mobile-padding">
        <div className="grid grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="card-familyhub p-4">
              <feature.icon className={`h-8 w-8 ${feature.color} mb-3`} />
              <h3 className="font-semibold text-lg mb-2 font-poppins">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm font-inter">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="space-y-4 mb-8">
          <Button 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading Demo Data...
              </div>
            ) : (
              "Get Started with FamilyHub"
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center font-inter">
            Experience all features with demo data. No account required.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <div className="flex items-center justify-center text-xs text-muted-foreground mb-2">
            <Shield className="h-3 w-3 mr-1" />
            <span>Your data is secure and never shared</span>
          </div>
        </div>
      </div>
    </div>
  );
};
