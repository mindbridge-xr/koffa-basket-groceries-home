import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  ArrowRight
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
    groceryBudget: 0
  });

  if (!chef) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center pb-20">
        <div className="text-center mobile-spacing">
          <h2 className="text-xl font-semibold text-foreground mb-4 font-poppins">Chef Not Found</h2>
          <Button onClick={() => navigate('/chef-marketplace')} className="btn-primary">
            Back to Marketplace
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Mock recipes for demo
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
    }
  ];

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Keto', 'Low-carb'];

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
        description: "Your booking has been confirmed. Check your dashboard for details.",
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
        navigate('/chef-dashboard');
      }, 1000);
      
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

  const handleSubmit = () => {
    if (!selectedService) return;
    
    // Show payment confirmation
    setStep(5);
  };

  // Check if step 2 is valid
  const isStep2Valid = bookingData.date && bookingData.time;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Book Chef Service"
        subtitle={`Booking with ${chef.name}`}
        showBack={true}
        onBack={() => step > 1 ? setStep(step - 1) : navigate(`/chef-profile/${chef.id}`)}
      >
        <div className="text-sm font-medium">Step {Math.min(step, 4)} of 4</div>
      </PageHeader>

      {/* Progress Bar */}
      <div className="mobile-spacing pt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="mobile-spacing py-6 space-y-6">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground font-poppins">Choose Your Service</h2>
            
            <div className="space-y-3">
              {chef.services.map(service => (
                <Card 
                  key={service.id}
                  className={`card-familyhub cursor-pointer transition-all ${
                    bookingData.serviceId === service.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setBookingData(prev => ({ ...prev, serviceId: service.id }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-foreground font-poppins">
                        {service.name}
                      </h3>
                      <Badge variant="outline" className="capitalize">
                        {service.category.replace('-', ' ')}
                      </Badge>
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
              disabled={!bookingData.serviceId}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Event Details</h2>
            
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
                >
                  {[
                    { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
                    { value: 'lunch', label: 'Lunch', icon: '🥗' },
                    { value: 'dinner', label: 'Dinner', icon: '🍽️' },
                    { value: 'meal-prep', label: 'Meal Prep', icon: '📦' },
                    { value: 'private-event', label: 'Private Event', icon: '🎉' }
                  ].map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <span>{option.icon}</span>
                        <span className="font-inter">{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="date"
                    className="input-familyhub"
                    value={bookingData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </CardContent>
              </Card>

              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="time"
                    className="input-familyhub"
                    value={bookingData.time}
                    onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </CardContent>
              </Card>
            </div>

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
                      guestCount: prev.guestCount + 1 
                    }))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(3)}
              disabled={!isStep2Valid}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Menu Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Menu Selection</h2>
            
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Dietary Restrictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
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
              <h3 className="text-lg font-semibold text-foreground font-poppins">
                Choose Your Menu ({bookingData.selectedRecipes.length} selected)
              </h3>
              
              {mockRecipes.map(recipe => (
                <Card 
                  key={recipe.id}
                  className={`card-familyhub cursor-pointer transition-all ${
                    bookingData.selectedRecipes.some(r => r.id === recipe.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => toggleRecipe(recipe)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base text-foreground font-poppins">
                          {recipe.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 font-inter">
                          {recipe.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                          <span className="font-inter">{recipe.cookingTime} min</span>
                          <span className="font-inter capitalize">{recipe.difficulty}</span>
                          <span className="font-inter">{recipe.servings} servings</span>
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

            <Button 
              className="w-full btn-primary" 
              onClick={() => setStep(4)}
              disabled={bookingData.selectedRecipes.length === 0}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 4: Grocery & Final Details */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground font-poppins">Grocery & Payment</h2>
            
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
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="client-buys" id="client-buys" />
                      <Label htmlFor="client-buys" className="cursor-pointer font-inter">
                        I'll buy the groceries myself (Free)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chef-buys" id="chef-buys" />
                      <Label htmlFor="chef-buys" className="cursor-pointer font-inter">
                        Chef handles grocery shopping (+$50)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="family-shops" id="family-shops" />
                      <Label htmlFor="family-shops" className="cursor-pointer font-inter">
                        Assign to family member (Free)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer font-inter">
                        Grocery delivery service (Varies)
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  placeholder="Any special requests or notes for the chef..."
                  className="input-familyhub min-h-20 resize-none w-full"
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </CardContent>
            </Card>

            {/* Price Summary */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-inter">Service Fee</span>
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
              </CardContent>
            </Card>

            <Button 
              className="w-full btn-primary" 
              onClick={handleSubmit}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* Step 5: Payment Confirmation */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-bold text-foreground font-poppins mb-2">Confirm Payment</h2>
              <p className="text-muted-foreground font-inter">Review your booking details before payment</p>
            </div>

            {/* Booking Summary */}
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
                  <span className="font-inter">Date & Time</span>
                  <span className="font-poppins font-medium">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Guests</span>
                  <span className="font-poppins font-medium">{bookingData.guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter">Selected Recipes</span>
                  <span className="font-poppins font-medium">{bookingData.selectedRecipes.length}</span>
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
