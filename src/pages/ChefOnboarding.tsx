import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/PageHeader';
import { ChefHat, Clock, DollarSign, MapPin, Award } from 'lucide-react';
import { Chef } from '@/types/chef';

export const ChefOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { becomeChef, setIsChef } = useChef();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    specialties: [] as string[],
    cuisineTypes: [] as string[],
    experienceLevel: 'home-cook' as Chef['experienceLevel'],
    hourlyRate: 50,
    location: '',
    isVerified: false,
    availability: [],
    services: [],
    portfolio: [],
    recipes: [],
    reviews: [],
    certifications: []
  });

  const specialtyOptions = [
    'Pasta', 'Pizza', 'Sushi', 'BBQ', 'Desserts', 'Bread Baking',
    'Meal Prep', 'Diet/Nutrition', 'Wine Pairing', 'Vegetarian/Vegan'
  ];

  const cuisineOptions = [
    'Italian', 'Asian', 'Mexican', 'French', 'Mediterranean', 'American',
    'Indian', 'Thai', 'Japanese', 'Fusion'
  ];

  const certificationOptions = [
    'Culinary Institute Graduate', 'Food Safety Certified', 'Nutrition Specialist',
    'Wine Sommelier', 'Pastry Chef Certified', 'Organic Cooking Certified'
  ];

  const toggleSpecialty = (specialty: string) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const toggleCuisine = (cuisine: string) => {
    setProfileData(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }));
  };

  const toggleCertification = (cert: string) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleSubmit = async () => {
    if (profileData.name && profileData.email && profileData.bio) {
      setIsSubmitting(true);
      
      try {
        // Create a complete chef profile with default services
        const completeProfile = {
          ...profileData,
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
          ]
        };

        console.log('Creating chef profile:', completeProfile);
        
        // Set chef status and profile
        setIsChef(true);
        becomeChef(completeProfile);
        
        // Navigate to chef dashboard
        setTimeout(() => {
          navigate('/chef-dashboard');
        }, 100);
        
      } catch (error) {
        console.error('Error creating chef profile:', error);
        setIsSubmitting(false);
      }
    }
  };

  const canContinueStep1 = profileData.name && profileData.email && profileData.bio && profileData.location;
  const canContinueStep2 = profileData.specialties.length > 0 && profileData.cuisineTypes.length > 0;
  const canContinueStep3 = profileData.hourlyRate >= 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Become a Chef"
        subtitle="Join our marketplace and start earning"
        showBack={true}
        onBack={() => step > 1 ? setStep(step - 1) : navigate('/chef-marketplace')}
      >
        <div className="text-sm font-medium">Step {step} of 4</div>
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

      <div className="mobile-spacing py-6 space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground font-poppins">Basic Information</h2>
            
            <Card className="card-familyhub">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="name" className="font-inter">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="input-familyhub"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="font-inter">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="chef@example.com"
                    className="input-familyhub"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="font-inter">Location</Label>
                  <Input
                    id="location"
                    placeholder="Your city or area"
                    className="input-familyhub"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio" className="font-inter">Bio</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about your cooking experience and passion..."
                    className="input-familyhub min-h-24 resize-none w-full"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(2)}
              disabled={!canContinueStep1}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Experience & Specialties */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Experience & Specialties</h2>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Experience Level</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={profileData.experienceLevel} 
                  onValueChange={(value: Chef['experienceLevel']) => 
                    setProfileData(prev => ({ ...prev, experienceLevel: value }))
                  }
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home-cook" id="home-cook" />
                      <Label htmlFor="home-cook" className="cursor-pointer font-inter">
                        Home Cook - Passionate about cooking at home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional" className="cursor-pointer font-inter">
                        Professional Chef - Restaurant or catering experience
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="culinary-trained" id="culinary-trained" />
                      <Label htmlFor="culinary-trained" className="cursor-pointer font-inter">
                        Culinary Trained - Formal culinary education
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {specialtyOptions.map(specialty => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={profileData.specialties.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <Label htmlFor={specialty} className="text-sm font-inter cursor-pointer">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Cuisine Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {cuisineOptions.map(cuisine => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={profileData.cuisineTypes.includes(cuisine)}
                        onCheckedChange={() => toggleCuisine(cuisine)}
                      />
                      <Label htmlFor={cuisine} className="text-sm font-inter cursor-pointer">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(3)}
              disabled={!canContinueStep2}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Certifications & Pricing */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Certifications & Pricing</h2>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Certifications (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {certificationOptions.map(cert => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={profileData.certifications.includes(cert)}
                        onCheckedChange={() => toggleCertification(cert)}
                      />
                      <Label htmlFor={cert} className="text-sm font-inter cursor-pointer">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Hourly Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="50"
                    className="input-familyhub"
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                  />
                  <p className="text-sm text-muted-foreground font-inter">
                    Set your base hourly rate. You can adjust this later and create custom pricing for different services.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(4)}
              disabled={!canContinueStep3}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Review Your Profile</h2>
            
            <Card className="card-familyhub">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground font-poppins">{profileData.name}</h3>
                  <p className="text-sm text-muted-foreground font-inter">{profileData.email}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-inter">{profileData.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground font-inter">{profileData.bio}</p>
                
                <div>
                  <Badge className={
                    profileData.experienceLevel === 'professional' 
                      ? 'bg-primary text-white'
                      : profileData.experienceLevel === 'culinary-trained'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }>
                    {profileData.experienceLevel.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-medium font-poppins mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {profileData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium font-poppins mb-2">Cuisine Types</h4>
                  <div className="flex flex-wrap gap-1">
                    {profileData.cuisineTypes.map((cuisine, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-medium font-poppins">Hourly Rate</span>
                  <span className="text-xl font-bold text-primary font-poppins">
                    ${profileData.hourlyRate}/hr
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Setting up your profile...
                </div>
              ) : (
                <>
                  <ChefHat className="h-4 w-4 mr-2" />
                  Complete Profile
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefOnboarding;
