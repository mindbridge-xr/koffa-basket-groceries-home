
import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar,
  Clock,
  Users,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Plus,
  Minus,
  ChefHat,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Info
} from 'lucide-react';
import { Recipe, BookingRequest } from '@/types/chef';

export const ChefBooking: React.FC = () => {
  const { chefId } = useParams<{ chefId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { chefs, createBooking } = useChef();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const chef = chefs.find(c => c.id === chefId);
  const preselectedServiceId = searchParams.get('service');
  
  const [bookingData, setBookingData] = useState({
    serviceId: preselectedServiceId || '',
    eventType: 'dinner' as BookingRequest['eventType'],
    date: '',
    time: '',
    guestCount: 2,
    selectedRecipes: [] as Recipe[],
    groceryHandling: 'client-buys' as BookingRequest['groceryHandling'],
    specialRequests: '',
    dietaryRestrictions: [] as string[],
    groceryBudget: 100
  });

  if (!chef) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center pb-20">
        <div className="text-center mobile-spacing">
          <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-4 font-poppins">Chef Not Found</h2>
          <p className="text-muted-foreground mb-6 font-inter">The chef you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/chef-marketplace')} className="btn-primary">
            Back to Marketplace
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Enhanced mock recipes with more variety
  const mockRecipes: Recipe[] = [
    {
      id: 'recipe-1',
      name: 'Truffle Pasta',
      description: 'Handmade pasta with black truffle and parmesan',
      ingredients: ['Fresh pasta', 'Black truffle', 'Parmesan', 'Butter', 'Cream'],
      cookingTime: 30,
      difficulty: 'medium',
      cuisineType: 'Italian',
      dietaryTags: ['vegetarian'],
      servings: 4,
      mealType: 'dinner'
    },
    {
      id: 'recipe-2',
      name: 'Pan-Seared Salmon',
      description: 'Fresh Atlantic salmon with lemon herb butter',
      ingredients: ['Salmon fillet', 'Lemon', 'Herbs', 'Butter', 'Asparagus'],
      cookingTime: 25,
      difficulty: 'easy',
      cuisineType: 'Mediterranean',
      dietaryTags: ['gluten-free', 'keto'],
      servings: 4,
      mealType: 'dinner'
    },
    {
      id: 'recipe-3',
      name: 'Chocolate Soufflé',
      description: 'Classic French chocolate soufflé with vanilla ice cream',
      ingredients: ['Dark chocolate', 'Eggs', 'Sugar', 'Butter', 'Vanilla'],
      cookingTime: 45,
      difficulty: 'hard',
      cuisineType: 'French',
      dietaryTags: ['vegetarian'],
      servings: 6,
      mealType: 'dessert'
    },
    {
      id: 'recipe-4',
      name: 'Quinoa Buddha Bowl',
      description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
      ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Kale', 'Tahini'],
      cookingTime: 35,
      difficulty: 'easy',
      cuisineType: 'Mediterranean',
      dietaryTags: ['vegan', 'gluten-free'],
      servings: 2,
      mealType: 'lunch'
    }
  ];

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Keto', 'Low-carb', 'Pescatarian'];

  const selectedService = chef.services.find(s => s.id === bookingData.serviceId);
  const basePrice = selectedService?.price || 0;
  const groceryFee = bookingData.groceryHandling === 'chef-buys' ? 50 : 0;
  const totalPrice = basePrice + groceryFee;

  const toggleRecipe = (recipe: Recipe) => {
    setBookingData(prev => ({
      ...prev,
      selectedRecipes: prev.selectedRecipes.some(r => r.id === recipe.id)
        ? prev.selectedRecipes.filter(r => r.id !== recipe.id)
        : [...prev.selectedRecipes, recipe]
    }));
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setBookingData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. The chef will contact you soon.",
      });

      // Create the booking
      if (!selectedService) return;

      const booking = {
        chefId: chef.id,
        clientId: 'demo-client',
        serviceId: bookingData.serviceId,
        date: bookingData.date,
        time: bookingData.time,
        duration: selectedService.duration,
        totalPrice,
        status: 'confirmed' as const,
        notes: `Event: ${bookingData.eventType}, Guests: ${bookingData.guestCount}, Grocery: ${bookingData.groceryHandling}, Special requests: ${bookingData.specialRequests}, Recipes: ${bookingData.selectedRecipes.map(r => r.name).join(', ')}, Dietary restrictions: ${bookingData.dietaryRestrictions.join(', ')}`
      };

      createBooking(booking);
      
      // Navigate to dashboard after successful booking
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Enhanced validation
  const isStep1Valid = bookingData.serviceId;
  const isStep2Valid = bookingData.date && bookingData.time && bookingData.guestCount > 0;
  const isStep3Valid = bookingData.selectedRecipes.length > 0;
  const isStep4Valid = true; // Optional step

  const canContinue = () => {
    switch (step) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return isStep4Valid;
      default: return false;
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Book Chef Service"
        subtitle={`Booking with ${chef.name}`}
        showBack={true}
        onBack={() => step > 1 ? setStep(step - 1) : navigate(`/chef-profile/${chef.id}`)}
      >
        <div className="text-sm font-medium text-white">Step {Math.min(step, 4)} of 4</div>
      </PageHeader>

      {/* Enhanced Progress Bar */}
      <div className="mobile-spacing pt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground font-inter">
          <span className={step >= 1 ? 'text-primary font-medium' : ''}>Service</span>
          <span className={step >= 2 ? 'text-primary font-medium' : ''}>Details</span>
          <span className={step >= 3 ? 'text-primary font-medium' : ''}>Menu</span>
          <span className={step >= 4 ? 'text-primary font-medium' : ''}>Payment</span>
        </div>
      </div>

      <div className="mobile-spacing py-6 space-y-6">
        {/* Step 1: Enhanced Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Choose Your Service</h2>
              <p className="text-muted-foreground font-inter">Select the perfect service for your needs</p>
            </div>
            
            <div className="space-y-3">
              {chef.services.map(service => (
                <Card 
                  key={service.id}
                  className={`card-familyhub cursor-pointer transition-all hover:shadow-md ${
                    bookingData.serviceId === service.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setBookingData(prev => ({ ...prev, serviceId: service.id }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-foreground font-poppins">
                        {service.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {service.category.replace('-', ' ')}
                        </Badge>
                        {bookingData.serviceId === service.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 font-inter">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="font-inter">{service.duration} min</span>
                        </div>
                        {service.maxGuests && (
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            <span className="font-inter">Up to {service.maxGuests}</span>
                          </div>
                        )}
                        {service.includesGroceries && (
                          <div className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            <span className="font-inter">Groceries included</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xl font-bold text-primary font-poppins">
                        ${service.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(2)}
              disabled={!canContinue()}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Continue to Details
            </Button>
          </div>
        )}

        {/* Step 2: Enhanced Event Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Event Details</h2>
              <p className="text-muted-foreground font-inter">Tell us about your event</p>
            </div>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Event Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={bookingData.eventType} 
                  onValueChange={(value: BookingRequest['eventType']) => 
                    setBookingData(prev => ({ ...prev, eventType: value }))
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
                    { value: 'lunch', label: 'Lunch', icon: '🥗' },
                    { value: 'dinner', label: 'Dinner', icon: '🍽️' },
                    { value: 'meal-prep', label: 'Meal Prep', icon: '📦' },
                    { value: 'cooking-class', label: 'Cooking Class', icon: '👩‍🍳' },
                    { value: 'private-event', label: 'Private Event', icon: '🎉' }
                  ].map(option => (
                    <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                        <span>{option.icon}</span>
                        <span className="font-inter">{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium font-inter">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="input-familyhub mt-1"
                      value={bookingData.date}
                      min={getMinDate()}
                      onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium font-inter">Time</Label>
                    <Select value={bookingData.time} onValueChange={(value) => setBookingData(prev => ({ ...prev, time: value }))}>
                      <SelectTrigger className="input-familyhub mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 8; // 8 AM to 7 PM
                          const time24 = `${hour.toString().padStart(2, '0')}:00`;
                          const time12 = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
                          return (
                            <SelectItem key={time24} value={time24}>
                              {time12}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Number of Guests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBookingData(prev => ({ 
                        ...prev, 
                        guestCount: Math.max(1, prev.guestCount - 1) 
                      }))}
                      disabled={bookingData.guestCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-bold text-foreground font-poppins w-12 text-center">
                      {bookingData.guestCount}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setBookingData(prev => ({ 
                        ...prev, 
                        guestCount: Math.min(selectedService?.maxGuests || 20, prev.guestCount + 1)
                      }))}
                      disabled={selectedService?.maxGuests ? bookingData.guestCount >= selectedService.maxGuests : false}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {selectedService?.maxGuests && (
                    <p className="text-xs text-muted-foreground text-center mt-2 font-inter">
                      Maximum {selectedService.maxGuests} guests for this service
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="flex-1 btn-secondary" 
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                className="flex-1 btn-primary" 
                onClick={() => setStep(3)}
                disabled={!canContinue()}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Enhanced Menu Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Menu Selection</h2>
              <p className="text-muted-foreground font-inter">Customize your dining experience</p>
            </div>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Dietary Restrictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={bookingData.dietaryRestrictions.includes(option)}
                        onCheckedChange={() => toggleDietaryRestriction(option)}
                      />
                      <Label htmlFor={option} className="text-sm font-inter cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground font-poppins">
                  Choose Your Menu
                </h3>
                <Badge variant="outline">
                  {bookingData.selectedRecipes.length} selected
                </Badge>
              </div>
              
              {mockRecipes.map(recipe => (
                <Card 
                  key={recipe.id}
                  className={`card-familyhub cursor-pointer transition-all hover:shadow-md ${
                    bookingData.selectedRecipes.some(r => r.id === recipe.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => toggleRecipe(recipe)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-base text-foreground font-poppins">
                            {recipe.name}
                          </h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {recipe.mealType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 font-inter">
                          {recipe.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                          <span className="font-inter">{recipe.cookingTime} min</span>
                          <span className="font-inter capitalize">{recipe.difficulty}</span>
                          <span className="font-inter">{recipe.servings} servings</span>
                          <span className="font-inter">{recipe.cuisineType}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.dietaryTags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {bookingData.selectedRecipes.some(r => r.id === recipe.id) && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="flex-1 btn-secondary" 
                onClick={() => setStep(2)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                className="flex-1 btn-primary" 
                onClick={() => setStep(4)}
                disabled={!canContinue()}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Enhanced Grocery & Payment */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Final Details</h2>
              <p className="text-muted-foreground font-inter">Choose grocery options and add special requests</p>
            </div>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Grocery Shopping Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={bookingData.groceryHandling} 
                  onValueChange={(value: BookingRequest['groceryHandling']) => 
                    setBookingData(prev => ({ ...prev, groceryHandling: value }))
                  }
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="client-buys" id="client-buys" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="client-buys" className="cursor-pointer font-inter font-medium">
                        I'll buy the groceries myself
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Free - You'll receive a detailed shopping list
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="chef-buys" id="chef-buys" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="chef-buys" className="cursor-pointer font-inter font-medium">
                        Chef handles grocery shopping
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        +$50 - Chef will buy all ingredients with receipts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="family-shops" id="family-shops" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="family-shops" className="cursor-pointer font-inter font-medium">
                        Assign to family member
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Free - Delegate shopping to a family member
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="delivery" className="cursor-pointer font-inter font-medium">
                        Grocery delivery service
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Price varies - Use your preferred delivery service
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {bookingData.groceryHandling === 'chef-buys' && (
              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Grocery Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium font-inter">
                      Estimated budget: ${bookingData.groceryBudget}
                    </Label>
                    <input
                      type="range"
                      id="budget"
                      min="50"
                      max="300"
                      value={bookingData.groceryBudget}
                      onChange={(e) => setBookingData(prev => ({ ...prev, groceryBudget: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground font-inter">
                      <span>$50</span>
                      <span>$300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Any special requests, allergies, or notes for the chef..."
                  className="input-familyhub min-h-20 resize-none w-full"
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </CardContent>
            </Card>

            {/* Enhanced Price Summary */}
            <Card className="card-familyhub border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-inter">{selectedService?.name}</span>
                  <span className="font-poppins">${basePrice}</span>
                </div>
                {groceryFee > 0 && (
                  <div className="flex justify-between">
                    <span className="font-inter">Grocery Shopping</span>
                    <span className="font-poppins">${groceryFee}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold font-poppins">Total</span>
                  <span className="text-xl font-bold text-primary font-poppins">${totalPrice}</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <p className="text-xs text-blue-700 font-inter">
                      Payment will be processed securely. You can cancel up to 48 hours before your booking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="flex-1 btn-secondary" 
                onClick={() => setStep(3)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                className="flex-1 btn-primary" 
                onClick={() => setStep(5)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Enhanced Payment Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Confirm Payment</h2>
              <p className="text-muted-foreground font-inter">Review your booking details before payment</p>
            </div>

            {/* Enhanced Booking Summary */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-inter">Chef</span>
                  <span className="font-poppins font-medium">{chef.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Service</span>
                  <span className="font-poppins font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Event Type</span>
                  <span className="font-poppins font-medium capitalize">{bookingData.eventType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Date & Time</span>
                  <span className="font-poppins font-medium">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Guests</span>
                  <span className="font-poppins font-medium">{bookingData.guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Recipes</span>
                  <span className="font-poppins font-medium">{bookingData.selectedRecipes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Grocery Handling</span>
                  <span className="font-poppins font-medium capitalize">{bookingData.groceryHandling.replace('-', ' ')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold font-poppins">Total Amount</span>
                  <span className="text-xl font-bold text-primary font-poppins">${totalPrice}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                className="w-full btn-primary" 
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirm & Pay ${totalPrice}
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full btn-secondary"
                onClick={() => setStep(4)}
                disabled={isProcessing}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Review
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefBooking;
