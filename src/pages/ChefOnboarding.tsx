
import React, { useState } from 'react';
import { useChef } from '@/context/ChefContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { ArrowRight, Check, Star, Award, Users, ChefHat } from 'lucide-react';

export const ChefOnboarding: React.FC = () => {
  const { becomeChef } = useChef();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialties: [] as string[],
    cuisineTypes: [] as string[],
    experienceLevel: 'home-cook' as 'home-cook' | 'professional' | 'culinary-trained',
    hourlyRate: 50,
    location: '',
    services: [] as any[]
  });

  const specialtyOptions = [
    'Pasta', 'Stir-fry', 'Grilling', 'Baking', 'Desserts', 'Salads',
    'Soups', 'Vegetarian', 'Vegan', 'Gluten-free', 'Meal Prep', 'BBQ'
  ];

  const cuisineOptions = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'French',
    'Japanese', 'Korean', 'Mediterranean', 'American', 'Fusion'
  ];

  const serviceTemplates = [
    {
      name: 'Private Dinner Party',
      description: 'Complete dinner service for special occasions',
      duration: 240,
      price: 300,
      category: 'private-chef' as const,
      maxGuests: 8
    },
    {
      name: 'Weekly Meal Prep',
      description: 'Healthy meal preparation for the week',
      duration: 180,
      price: 150,
      category: 'meal-prep' as const
    },
    {
      name: 'Cooking Class',
      description: 'Interactive cooking lesson',
      duration: 120,
      price: 80,
      category: 'cooking-class' as const,
      maxGuests: 6
    }
  ];

  const handleSubmit = () => {
    const chefProfile = {
      name: formData.name,
      email: 'demo@chef.com',
      bio: formData.bio,
      specialties: formData.specialties,
      cuisineTypes: formData.cuisineTypes,
      experienceLevel: formData.experienceLevel,
      hourlyRate: formData.hourlyRate,
      location: formData.location,
      isVerified: false,
      availability: [],
      services: formData.services.map((service, index) => ({
        ...service,
        id: `service-${Date.now()}-${index}`
      })),
      portfolio: []
    };

    becomeChef(chefProfile);
    navigate('/chef-dashboard');
  };

  const toggleSelection = (item: string, field: 'specialties' | 'cuisineTypes') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const toggleService = (service: any) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.some(s => s.name === service.name)
        ? prev.services.filter(s => s.name !== service.name)
        : [...prev.services, service]
    }));
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return Users;
      case 2: return Award;
      case 3: return ChefHat;
      case 4: return Star;
      default: return Users;
    }
  };

  const StepIcon = getStepIcon(step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Become a Chef"
        subtitle="Share your culinary skills with the community"
        showBack={true}
        onBack={() => step > 1 ? setStep(step - 1) : navigate('/chef-marketplace')}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Step {step} of 4</span>
        </div>
      </PageHeader>

      {/* Progress Bar */}
      <div className="mobile-spacing pt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="content-padding py-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="card-familyhub">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground font-poppins">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Full Name
                </label>
                <Input
                  placeholder="Your full name"
                  className="input-familyhub"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Bio
                </label>
                <textarea
                  placeholder="Tell people about your cooking experience and style..."
                  className="input-familyhub min-h-24 resize-none w-full"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Location
                </label>
                <Input
                  placeholder="Your city or area"
                  className="input-familyhub"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <Card className="card-familyhub">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground font-poppins">
                <Award className="h-5 w-5 mr-2 text-primary" />
                Experience Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'home-cook', title: 'Home Cook', desc: 'Passionate about cooking for family and friends', emoji: '👨‍🍳' },
                { id: 'professional', title: 'Professional Chef', desc: 'Work or worked in restaurants, catering, etc.', emoji: '🔥' },
                { id: 'culinary-trained', title: 'Culinary Trained', desc: 'Graduated from culinary school', emoji: '🎓' }
              ].map(level => (
                <button
                  key={level.id}
                  onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.id as any }))}
                  className={`w-full p-4 rounded-2xl border-2 transition-all animate-press text-left ${
                    formData.experienceLevel === level.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{level.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-base text-foreground font-poppins">{level.title}</h3>
                        <p className="text-sm text-muted-foreground font-inter">{level.desc}</p>
                      </div>
                    </div>
                    {formData.experienceLevel === level.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                  Hourly Rate ($)
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  className="input-familyhub"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Specialties */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground font-poppins">
                  <ChefHat className="h-5 w-5 mr-2 text-primary" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map(specialty => (
                    <Badge
                      key={specialty}
                      variant={formData.specialties.includes(specialty) ? "default" : "outline"}
                      className={`cursor-pointer animate-press font-inter ${
                        formData.specialties.includes(specialty) 
                          ? 'bg-primary text-white hover:bg-primary/90' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => toggleSelection(specialty, 'specialties')}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="text-foreground font-poppins">Cuisine Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map(cuisine => (
                    <Badge
                      key={cuisine}
                      variant={formData.cuisineTypes.includes(cuisine) ? "default" : "outline"}
                      className={`cursor-pointer animate-press font-inter ${
                        formData.cuisineTypes.includes(cuisine) 
                          ? 'bg-primary text-white hover:bg-primary/90' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => toggleSelection(cuisine, 'cuisineTypes')}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Services */}
        {step === 4 && (
          <Card className="card-familyhub">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground font-poppins">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Choose Your Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceTemplates.map(service => (
                <button
                  key={service.name}
                  onClick={() => toggleService(service)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all animate-press text-left ${
                    formData.services.some(s => s.name === service.name)
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-base text-foreground font-poppins">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 font-inter">{service.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground font-inter">
                        <span>{service.duration} min</span>
                        <span>${service.price}</span>
                        {service.maxGuests && <span>Max {service.maxGuests} guests</span>}
                      </div>
                    </div>
                    {formData.services.some(s => s.name === service.name) && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-muted-foreground font-inter">
            {step < 4 && "Complete all steps to become a chef"}
          </div>
          
          <div className="flex space-x-3">
            {step < 4 ? (
              <Button 
                className="btn-primary"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!formData.name || !formData.bio || !formData.location)) ||
                  (step === 3 && formData.specialties.length === 0)
                }
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                className="btn-primary"
                onClick={handleSubmit}
                disabled={formData.services.length === 0}
              >
                Complete Setup
                <Check className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefOnboarding;
