
import React, { useState } from 'react';
import { useChef } from '@/context/ChefContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Check, Star, Award, Users } from 'lucide-react';

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
      email: 'demo@chef.com', // In real app, get from auth
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

  return (
    <div className="min-h-screen bg-uber-white">
      <div className="bg-uber-black text-uber-white section-padding">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/chef-marketplace')}
            className="p-2 hover:bg-uber-gray-800 rounded-xl transition-colors animate-press"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <span className="text-uber-sm font-medium">Step {step} of 4</span>
        </div>
        
        <h1 className="text-uber-2xl font-bold mb-2">Become a Chef</h1>
        <p className="text-uber-sm text-uber-white/80">Share your culinary skills with the community</p>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-uber-white/20 rounded-full mt-6">
          <div 
            className="h-full bg-uber-green rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="content-padding py-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="card-uber">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-uber-green" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-uber-sm font-medium text-uber-black mb-2">
                  Full Name
                </label>
                <Input
                  placeholder="Your full name"
                  className="input-uber"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-uber-sm font-medium text-uber-black mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="Tell people about your cooking experience and style..."
                  className="input-uber min-h-24 resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-uber-sm font-medium text-uber-black mb-2">
                  Location
                </label>
                <Input
                  placeholder="Your city or area"
                  className="input-uber"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <Card className="card-uber">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-uber-green" />
                Experience Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'home-cook', title: 'Home Cook', desc: 'Passionate about cooking for family and friends' },
                { id: 'professional', title: 'Professional Chef', desc: 'Work or worked in restaurants, catering, etc.' },
                { id: 'culinary-trained', title: 'Culinary Trained', desc: 'Graduated from culinary school' }
              ].map(level => (
                <button
                  key={level.id}
                  onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.id as any }))}
                  className={`w-full p-4 rounded-uber border-2 transition-all animate-press text-left ${
                    formData.experienceLevel === level.id 
                      ? 'border-uber-green bg-uber-green/5' 
                      : 'border-uber-gray-200 hover:border-uber-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-uber-base text-uber-black">{level.title}</h3>
                      <p className="text-uber-sm text-uber-gray-600">{level.desc}</p>
                    </div>
                    {formData.experienceLevel === level.id && (
                      <Check className="h-5 w-5 text-uber-green" />
                    )}
                  </div>
                </button>
              ))}
              
              <div>
                <label className="block text-uber-sm font-medium text-uber-black mb-2">
                  Hourly Rate ($)
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  className="input-uber"
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
            <Card className="card-uber">
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map(specialty => (
                    <Badge
                      key={specialty}
                      variant={formData.specialties.includes(specialty) ? "default" : "outline"}
                      className={`cursor-pointer animate-press ${
                        formData.specialties.includes(specialty) 
                          ? 'bg-uber-green text-white' 
                          : 'hover:bg-uber-gray-50'
                      }`}
                      onClick={() => toggleSelection(specialty, 'specialties')}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-uber">
              <CardHeader>
                <CardTitle>Cuisine Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map(cuisine => (
                    <Badge
                      key={cuisine}
                      variant={formData.cuisineTypes.includes(cuisine) ? "default" : "outline"}
                      className={`cursor-pointer animate-press ${
                        formData.cuisineTypes.includes(cuisine) 
                          ? 'bg-uber-green text-white' 
                          : 'hover:bg-uber-gray-50'
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
          <Card className="card-uber">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-uber-green" />
                Choose Your Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceTemplates.map(service => (
                <button
                  key={service.name}
                  onClick={() => toggleService(service)}
                  className={`w-full p-4 rounded-uber border-2 transition-all animate-press text-left ${
                    formData.services.some(s => s.name === service.name)
                      ? 'border-uber-green bg-uber-green/5' 
                      : 'border-uber-gray-200 hover:border-uber-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-uber-base text-uber-black">{service.name}</h3>
                      <p className="text-uber-sm text-uber-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center space-x-4 text-uber-xs text-uber-gray-500">
                        <span>{service.duration} min</span>
                        <span>${service.price}</span>
                        {service.maxGuests && <span>Max {service.maxGuests} guests</span>}
                      </div>
                    </div>
                    {formData.services.some(s => s.name === service.name) && (
                      <Check className="h-5 w-5 text-uber-green" />
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-uber-sm text-uber-gray-500">
            {step < 4 && "Complete all steps to become a chef"}
          </div>
          
          <div className="flex space-x-3">
            {step < 4 ? (
              <Button 
                className="btn-uber-primary"
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
                className="btn-uber-primary"
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
