
import React, { useState } from 'react';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChefCard } from '@/components/chef/ChefCard';
import { ServiceCard } from '@/components/chef/ServiceCard';
import { Search, Filter, Star, TrendingUp, Award, Users, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChefMarketplace: React.FC = () => {
  const { chefs, getChefsByService } = useChef();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedChef, setSelectedChef] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🍳' },
    { id: 'meal-prep', name: 'Meal Prep', icon: '🥗' },
    { id: 'cooking-class', name: 'Cooking Classes', icon: '👨‍🍳' },
    { id: 'consultation', name: 'Consultation', icon: '💬' },
    { id: 'private-chef', name: 'Private Chef', icon: '🍽️' }
  ];

  const filteredChefs = chefs.filter(chef => {
    const matchesSearch = chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chef.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           chef.services.some(s => s.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Active Chefs', value: chefs.length, icon: Users },
    { label: 'Avg Rating', value: '4.8', icon: Star },
    { label: 'Services', value: '50+', icon: Award },
    { label: 'Bookings', value: '1.2k', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <div className="bg-gradient-primary text-white mobile-padding">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold mb-1 font-poppins">Chef Marketplace</h1>
              <p className="text-sm text-white/80 font-inter">Discover talented chefs in your area</p>
            </div>
          </div>
          <Link to="/chef-onboarding">
            <Button className="bg-white text-primary hover:bg-white/90 font-medium">
              Become a Chef
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-1 text-white" />
              <div className="text-sm font-bold font-poppins">{stat.value}</div>
              <div className="text-xs text-white/60 font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-spacing space-y-6 py-6">
        {/* Search */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search chefs or specialties..."
              className="input-familyhub pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Chefs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              {selectedCategory === 'all' ? 'Featured Chefs' : `${categories.find(c => c.id === selectedCategory)?.name} Specialists`}
            </h2>
            <Button variant="outline" size="sm" className="btn-secondary">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredChefs.map(chef => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onClick={() => setSelectedChef(chef.id)}
              />
            ))}
          </div>
          
          {filteredChefs.length === 0 && (
            <div className="card-familyhub p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No chefs found</h3>
              <p className="text-sm text-muted-foreground font-inter">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>

        {/* Popular Services */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground font-poppins">Popular Services</h2>
          <div className="grid grid-cols-1 gap-3">
            {chefs.slice(0, 3).map(chef => 
              chef.services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => console.log('Book service:', service.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefMarketplace;
