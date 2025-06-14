
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Search, Users, DollarSign, Clock, Star, ArrowRight } from 'lucide-react';

export const ChefWelcome: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Chefs', value: '500+', icon: ChefHat },
    { label: 'Happy Families', value: '2,000+', icon: Users },
    { label: 'Avg Chef Earnings', value: '$75/hr', icon: DollarSign },
    { label: 'Avg Rating', value: '4.8★', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <ChefHat className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Welcome to ChefConnect
          </h1>
          <p className="text-xl text-white/90 mb-8 font-inter">
            Connect with professional chefs or start your culinary journey
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold font-poppins">{stat.value}</div>
                <div className="text-sm text-white/80 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8 font-poppins">
          How would you like to get started?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Find a Chef Card */}
          <Card className="card-familyhub-hover cursor-pointer group" onClick={() => navigate('/chef-marketplace')}>
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-poppins">Find a Chef</h3>
              <p className="text-muted-foreground mb-6 font-inter">
                Discover talented chefs for meal prep, cooking classes, private dinners, and more.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 font-inter">
                <li>• Browse verified professional chefs</li>
                <li>• Read reviews and ratings</li>
                <li>• Book services instantly</li>
                <li>• Flexible scheduling</li>
              </ul>
              <Button className="w-full btn-primary group-hover:scale-105 transition-transform">
                Browse Chefs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Become a Chef Card */}
          <Card className="card-familyhub-hover cursor-pointer group" onClick={() => navigate('/chef-onboarding')}>
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <ChefHat className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-poppins">Become a Chef</h3>
              <p className="text-muted-foreground mb-6 font-inter">
                Join our marketplace and start earning by sharing your culinary skills with families.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 font-inter">
                <li>• Flexible schedule, work when you want</li>
                <li>• Great earnings potential ($30-100+/hr)</li>
                <li>• Connect with food-loving families</li>
                <li>• Professional support & resources</li>
              </ul>
              <Button className="w-full btn-primary group-hover:scale-105 transition-transform">
                Start Application
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-center text-foreground mb-8 font-poppins">
            What Our Community Says
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-familyhub">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 font-inter">
                  "Amazing experience! Chef Maria created the most delicious Italian dinner for our anniversary. Everything was perfect!"
                </p>
                <div className="text-sm font-medium font-poppins">- Sarah J., Happy Customer</div>
              </CardContent>
            </Card>
            
            <Card className="card-familyhub">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 font-inter">
                  "Being a chef on this platform has been incredible. I love sharing my passion for cooking and the flexible schedule is perfect!"
                </p>
                <div className="text-sm font-medium font-poppins">- James C., Professional Chef</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefWelcome;
