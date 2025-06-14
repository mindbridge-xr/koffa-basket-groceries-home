
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { PageHeader } from '@/components/PageHeader';
import { MarketplaceStats } from '@/components/chef/marketplace/MarketplaceStats';
import { MarketplaceFilters } from '@/components/chef/marketplace/MarketplaceFilters';
import { ChefList } from '@/components/chef/marketplace/ChefList';
import { BecomeChefCTA } from '@/components/chef/marketplace/BecomeChefCTA';
import { Chef } from '@/types/chef';

export const ChefMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const { chefs } = useChef();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

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

  const hasActiveFilters = Boolean(searchTerm) || selectedService !== 'all' || selectedLocation !== 'all' || priceRange !== 'all';

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedService('all');
    setSelectedLocation('all');
    setPriceRange('all');
  };

  const handleChefClick = (chef: Chef) => {
    navigate(`/chef-profile/${chef.id}`);
  };

  const handleJoinClick = () => {
    navigate('/chef-welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title="Chef Marketplace"
        subtitle="Find the perfect chef for your culinary needs"
        showBack={true}
      />

      <div className="mobile-spacing py-4 space-y-6">
        <MarketplaceStats chefs={chefs} />

        <MarketplaceFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <ChefList
          filteredChefs={filteredChefs}
          onChefClick={handleChefClick}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />

        <BecomeChefCTA onJoinClick={handleJoinClick} />
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefMarketplace;
