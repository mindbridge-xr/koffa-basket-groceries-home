
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
}

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedService,
  setSelectedService,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange
}) => {
  const serviceTypes = ['all', 'meal-prep', 'cooking-class', 'consultation', 'private-chef'];
  const locations = ['all', 'Downtown', 'Midtown', 'Uptown', 'Suburbs'];

  return (
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
  );
};
