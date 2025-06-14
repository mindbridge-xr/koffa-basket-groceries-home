
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { ChefCard } from '@/components/chef/ChefCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Star, 
  MapPin, 
  ChefHat,
  Users,
  Award
} from 'lucide-react';

export const ChefMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const { chefs } = useChef();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const serviceTypes = ['all', 'meal-prep', 'cooking-class', 'consultation', 'private-chef'];
  const locations = ['all', 'Downtown', 'Midtown', 'Uptown', 'Suburbs'];

  const filteredChefs = chefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chef.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         chef.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesService = selectedService === 'all' || 
                          chef.services.some(s => s.category === selectedService);
    
    const matchesLocation = selectedLocation === 'all' || chef.location === selectedLocation;
    
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'budget' && chef.hourlyRate < 50) ||
                        (priceRange === 'mid-range' && chef.hourlyRate >= 50 && chef.hourlyRate < 80) ||
                        (priceRange === 'premium' && chef.hourlyRate >= 80);

    return matchesSearch && matchesService && matchesLocation && matchesPrice;
  });

  const stats = {
    totalChefs: chefs.length,
    avgRating: (chefs.reduce((sum, chef) => sum + chef.rating, 0) / chefs.length).toFixed(1),
    totalBookings: chefs.reduce((sum, chef) => sum + chef.totalBookings, 0),
    verifiedChefs: chefs.filter(chef => chef.isVerified).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Chef Marketplace"
        subtitle="Find the perfect chef for your culinary needs"
        showBack={true}
      />

      <div className="mobile-spacing py-4 space-y-6">
        {/* Enhanced Marketplace Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="card-familyhub">
            <CardContent className="p-4 text-center">
              <ChefHat className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-xl font-bold text-foreground font-poppins">{stats.totalChefs}</div>
              <div className="text-xs text-muted-foreground font-inter">Professional Chefs</div>
            </CardContent>
          </Card>
          
          <Card className="card-familyhub">
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-xl font-bold text-foreground font-poppins">{stats.avgRating}★</div>
              <div className="text-xs text-muted-foreground font-inter">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="card-familyhub">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-xl font-bold text-foreground font-poppins">{stats.totalBookings}</div>
              <div className="text-xs text-muted-foreground font-inter">Happy Bookings</div>
            </CardContent>
          </Card>
          
          <Card className="card-familyhub">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-xl font-bold text-foreground font-poppins">{stats.verifiedChefs}</div>
              <div className="text-xs text-muted-foreground font-inter">Verified Chefs</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <Card className="card-familyhub">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by chef name, specialty, or cuisine type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-familyhub"
              />
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map(service => (
                    <SelectItem key={service} value={service}>
                      {service === 'all' ? 'All Services' : service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Areas' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="input-familyhub">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget ($30-50/hr)</SelectItem>
                  <SelectItem value="mid-range">Mid-range ($50-80/hr)</SelectItem>
                  <SelectItem value="premium">Premium ($80+/hr)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground font-poppins">
            Available Chefs ({filteredChefs.length})
          </h2>
          {(searchTerm || selectedService !== 'all' || selectedLocation !== 'all' || priceRange !== 'all') && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedService('all');
                setSelectedLocation('all');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Enhanced Chef Grid */}
        {filteredChefs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredChefs.map(chef => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onClick={() => navigate(`/chef-profile/${chef.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card className="card-familyhub p-8 text-center">
            <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">No chefs found</h3>
            <p className="text-muted-foreground mb-6 font-inter">
              Try adjusting your search criteria or browse all available chefs.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedService('all');
                setSelectedLocation('all');
                setPriceRange('all');
              }}
            >
              Show All Chefs
            </Button>
          </Card>
        )}

        {/* Call to Action for Becoming a Chef */}
        <Card className="card-familyhub bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <ChefHat className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-foreground mb-2 font-poppins">
              Are You a Chef?
            </h3>
            <p className="text-muted-foreground mb-4 font-inter">
              Join our marketplace and connect with food-loving families in your area.
            </p>
            <Button 
              className="btn-primary"
              onClick={() => navigate('/chef-welcome')}
            >
              Learn More About Joining
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefMarketplace;
