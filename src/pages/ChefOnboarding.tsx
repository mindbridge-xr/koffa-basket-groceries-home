
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { PageHeader } from '@/components/PageHeader';
import { OnboardingStep } from '@/components/chef/OnboardingStep';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ChefHat, Upload, Award, Clock, DollarSign, Users } from 'lucide-react';
import { Chef } from '@/types/chef';

export const ChefOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { becomeChef, setIsChef } = useChef();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [profileData, setProfileData] = useState({
    // Step 1: Personal Information
    name: '',
    email: '',
    phone: '',
    location: '',
    
    // Step 2: Professional Background
    bio: '',
    experienceLevel: 'home-cook' as Chef['experienceLevel'],
    yearsExperience: 0,
    previousRoles: '',
    
    // Step 3: Specialties & Cuisine
    specialties: [] as string[],
    cuisineTypes: [] as string[],
    dietarySpecializations: [] as string[],
    
    // Step 4: Services & Pricing
    serviceTypes: [] as string[],
    hourlyRate: 50,
    travelDistance: 10,
    availability: '',
    
    // Step 5: Portfolio & Credentials
    certifications: [] as string[],
    portfolioDescription: '',
    instagramHandle: '',
    
    // Step 6: Final Details
    agreesToTerms: false,
    wantsInsurance: false,
    hasTransportation: true
  });

  const specialtyOptions = [
    'Pasta Making', 'Pizza', 'Sushi', 'BBQ & Grilling', 'Desserts & Pastry',
    'Bread Baking', 'Meal Prep', 'Diet/Nutrition', 'Wine Pairing', 'Fermentation',
    'Sauce Making', 'Knife Skills', 'Food Photography', 'Catering'
  ];

  const cuisineOptions = [
    'Italian', 'Asian Fusion', 'Mexican', 'French', 'Mediterranean', 'American',
    'Indian', 'Thai', 'Japanese', 'Chinese', 'Middle Eastern', 'Greek',
    'Spanish', 'Vietnamese', 'Korean', 'Fusion'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb',
    'Diabetic-Friendly', 'Heart-Healthy', 'Raw Food', 'Whole30'
  ];

  const serviceTypeOptions = [
    'Private Chef Service', 'Meal Prep', 'Cooking Classes', 'Dinner Parties',
    'Corporate Catering', 'Special Events', 'Recipe Development', 'Food Consulting'
  ];

  const certificationOptions = [
    'Culinary Institute Graduate', 'Food Safety Certified', 'ServSafe Manager',
    'Nutrition Specialist', 'Wine Sommelier', 'Pastry Arts Certificate',
    'Organic Cooking Certified', 'Food Handler\'s License'
  ];

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    setter(array.includes(item) ? array.filter(i => i !== item) : [...array, item]);
  };

  const canContinueStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1: return !!(profileData.name && profileData.email && profileData.phone && profileData.location);
      case 2: return !!(profileData.bio && profileData.previousRoles);
      case 3: return profileData.specialties.length > 0 && profileData.cuisineTypes.length > 0;
      case 4: return profileData.serviceTypes.length > 0 && profileData.hourlyRate >= 25;
      case 5: return !!profileData.portfolioDescription;
      case 6: return profileData.agreesToTerms;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/chef-welcome');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const completeProfile = {
        ...profileData,
        isVerified: false,
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
        ],
        availability: [],
        portfolio: [],
        recipes: [],
        reviews: []
      };

      setIsChef(true);
      becomeChef(completeProfile);
      
      setTimeout(() => {
        navigate('/chef-dashboard');
      }, 100);
      
    } catch (error) {
      console.error('Error creating chef profile:', error);
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep
            title="Personal Information"
            description="Let's start with your basic information"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(1)}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="font-inter">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="input-familyhub"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="font-inter">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="chef@example.com"
                    className="input-familyhub"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="font-inter">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="input-familyhub"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="font-inter">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="input-familyhub"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </OnboardingStep>
        );

      case 2:
        return (
          <OnboardingStep
            title="Professional Background"
            description="Tell us about your culinary experience"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(2)}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="space-y-6">
              <div>
                <Label className="font-inter">Experience Level</Label>
                <RadioGroup 
                  value={profileData.experienceLevel} 
                  onValueChange={(value: Chef['experienceLevel']) => 
                    setProfileData(prev => ({ ...prev, experienceLevel: value }))
                  }
                  className="mt-2"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home-cook" id="home-cook" />
                      <Label htmlFor="home-cook" className="cursor-pointer font-inter">
                        <span className="font-medium">Home Cook</span> - Passionate about cooking at home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional" className="cursor-pointer font-inter">
                        <span className="font-medium">Professional Chef</span> - Restaurant or catering experience
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="culinary-trained" id="culinary-trained" />
                      <Label htmlFor="culinary-trained" className="cursor-pointer font-inter">
                        <span className="font-medium">Culinary Trained</span> - Formal culinary education
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="years" className="font-inter">Years of Experience</Label>
                  <Input
                    id="years"
                    type="number"
                    min="0"
                    max="50"
                    className="input-familyhub"
                    value={profileData.yearsExperience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, yearsExperience: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="font-inter">Professional Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your cooking journey, what drives your passion for food, and what makes you unique as a chef..."
                  className="input-familyhub min-h-24 resize-none"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="roles" className="font-inter">Previous Roles & Experience *</Label>
                <Textarea
                  id="roles"
                  placeholder="Describe your previous cooking roles, restaurants worked at, or relevant experience..."
                  className="input-familyhub min-h-20 resize-none"
                  value={profileData.previousRoles}
                  onChange={(e) => setProfileData(prev => ({ ...prev, previousRoles: e.target.value }))}
                />
              </div>
            </div>
          </OnboardingStep>
        );

      case 3:
        return (
          <OnboardingStep
            title="Specialties & Cuisines"
            description="What are you passionate about cooking?"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(3)}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="space-y-6">
              <div>
                <Label className="font-inter font-medium">Cooking Specialties (Select at least 3) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {specialtyOptions.map(specialty => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={profileData.specialties.includes(specialty)}
                        onCheckedChange={() => toggleArrayItem(
                          profileData.specialties, 
                          specialty, 
                          (value) => setProfileData(prev => ({ ...prev, specialties: value }))
                        )}
                      />
                      <Label htmlFor={specialty} className="text-sm font-inter cursor-pointer">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-inter font-medium">Cuisine Types (Select at least 2) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {cuisineOptions.map(cuisine => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={profileData.cuisineTypes.includes(cuisine)}
                        onCheckedChange={() => toggleArrayItem(
                          profileData.cuisineTypes, 
                          cuisine, 
                          (value) => setProfileData(prev => ({ ...prev, cuisineTypes: value }))
                        )}
                      />
                      <Label htmlFor={cuisine} className="text-sm font-inter cursor-pointer">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-inter font-medium">Dietary Specializations (Optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {dietaryOptions.map(diet => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={diet}
                        checked={profileData.dietarySpecializations.includes(diet)}
                        onCheckedChange={() => toggleArrayItem(
                          profileData.dietarySpecializations, 
                          diet, 
                          (value) => setProfileData(prev => ({ ...prev, dietarySpecializations: value }))
                        )}
                      />
                      <Label htmlFor={diet} className="text-sm font-inter cursor-pointer">
                        {diet}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </OnboardingStep>
        );

      case 4:
        return (
          <OnboardingStep
            title="Services & Pricing"
            description="What services will you offer and at what rates?"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(4)}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="space-y-6">
              <div>
                <Label className="font-inter font-medium">Services You'll Offer *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {serviceTypeOptions.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={profileData.serviceTypes.includes(service)}
                        onCheckedChange={() => toggleArrayItem(
                          profileData.serviceTypes, 
                          service, 
                          (value) => setProfileData(prev => ({ ...prev, serviceTypes: value }))
                        )}
                      />
                      <Label htmlFor={service} className="text-sm font-inter cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate" className="font-inter font-medium">Base Hourly Rate *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="rate"
                      type="number"
                      min="25"
                      max="200"
                      placeholder="50"
                      className="input-familyhub pl-10"
                      value={profileData.hourlyRate}
                      onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-inter">
                    Minimum $25/hour. You can create custom pricing for different services.
                  </p>
                </div>

                <div>
                  <Label htmlFor="travel" className="font-inter font-medium">Travel Distance (miles)</Label>
                  <Input
                    id="travel"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="10"
                    className="input-familyhub"
                    value={profileData.travelDistance}
                    onChange={(e) => setProfileData(prev => ({ ...prev, travelDistance: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="availability" className="font-inter font-medium">General Availability</Label>
                <Textarea
                  id="availability"
                  placeholder="Describe your general availability (e.g., 'Weekdays after 5pm, weekends anytime', 'Flexible schedule', etc.)"
                  className="input-familyhub min-h-20 resize-none"
                  value={profileData.availability}
                  onChange={(e) => setProfileData(prev => ({ ...prev, availability: e.target.value }))}
                />
              </div>
            </div>
          </OnboardingStep>
        );

      case 5:
        return (
          <OnboardingStep
            title="Portfolio & Credentials"
            description="Showcase your skills and qualifications"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(5)}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="space-y-6">
              <div>
                <Label className="font-inter font-medium">Certifications & Credentials</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {certificationOptions.map(cert => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={profileData.certifications.includes(cert)}
                        onCheckedChange={() => toggleArrayItem(
                          profileData.certifications, 
                          cert, 
                          (value) => setProfileData(prev => ({ ...prev, certifications: value }))
                        )}
                      />
                      <Label htmlFor={cert} className="text-sm font-inter cursor-pointer">
                        {cert}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="portfolio" className="font-inter font-medium">Portfolio Description *</Label>
                <Textarea
                  id="portfolio"
                  placeholder="Describe your signature dishes, cooking style, memorable events you've catered, or any awards/recognition you've received..."
                  className="input-familyhub min-h-32 resize-none"
                  value={profileData.portfolioDescription}
                  onChange={(e) => setProfileData(prev => ({ ...prev, portfolioDescription: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="instagram" className="font-inter font-medium">Instagram Handle (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-inter">@</span>
                  <Input
                    id="instagram"
                    placeholder="yourhandle"
                    className="input-familyhub pl-8"
                    value={profileData.instagramHandle}
                    onChange={(e) => setProfileData(prev => ({ ...prev, instagramHandle: e.target.value }))}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-inter">
                  Showcase your food photography to attract more clients
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 font-poppins">Upload Portfolio Images</h4>
                    <p className="text-sm text-blue-700 font-inter">
                      After completing your application, you'll be able to upload photos of your dishes, 
                      certifications, and professional headshots to complete your profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </OnboardingStep>
        );

      case 6:
        return (
          <OnboardingStep
            title="Final Review & Agreement"
            description="Review your information and agree to our terms"
            currentStep={step}
            totalSteps={6}
            canContinue={canContinueStep(6)}
            onNext={handleNext}
            onBack={handleBack}
            nextLabel="Complete Application"
            isSubmitting={isSubmitting}
          >
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 font-poppins">Profile Summary</h4>
                <div className="space-y-2 text-sm font-inter">
                  <div><span className="font-medium">Name:</span> {profileData.name}</div>
                  <div><span className="font-medium">Location:</span> {profileData.location}</div>
                  <div><span className="font-medium">Experience:</span> {profileData.experienceLevel.replace('-', ' ')} ({profileData.yearsExperience} years)</div>
                  <div><span className="font-medium">Hourly Rate:</span> ${profileData.hourlyRate}/hour</div>
                  <div><span className="font-medium">Specialties:</span> {profileData.specialties.slice(0, 3).join(', ')}</div>
                  <div><span className="font-medium">Cuisines:</span> {profileData.cuisineTypes.slice(0, 3).join(', ')}</div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transportation"
                    checked={profileData.hasTransportation}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, hasTransportation: !!checked }))}
                  />
                  <Label htmlFor="transportation" className="font-inter">
                    I have reliable transportation to reach client locations
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={profileData.wantsInsurance}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, wantsInsurance: !!checked }))}
                  />
                  <Label htmlFor="insurance" className="font-inter">
                    I'm interested in liability insurance options (optional)
                  </Label>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="border-t pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={profileData.agreesToTerms}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, agreesToTerms: !!checked }))}
                  />
                  <Label htmlFor="terms" className="text-sm font-inter cursor-pointer">
                    I agree to the Terms of Service, Privacy Policy, and Community Guidelines. 
                    I understand that my application will be reviewed and I may be contacted for additional information.
                  </Label>
                </div>
              </div>

              {/* Next Steps Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-medium text-primary mb-2 font-poppins">What's Next?</h4>
                <ul className="text-sm text-primary/80 space-y-1 font-inter">
                  <li>• Application review (typically 24-48 hours)</li>
                  <li>• Background check and verification</li>
                  <li>• Profile activation and dashboard access</li>
                  <li>• Start receiving booking requests!</li>
                </ul>
              </div>
            </div>
          </OnboardingStep>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Chef Application"
        subtitle="Join our marketplace of culinary professionals"
        showBack={true}
        onBack={handleBack}
      />

      <div className="mobile-spacing py-6">
        {renderStepContent()}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefOnboarding;
