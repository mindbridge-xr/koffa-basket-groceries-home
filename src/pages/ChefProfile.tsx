
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChef } from '@/context/ChefContext';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar,
  ChefHat,
  Award,
  MessageCircle,
  Heart,
  Share2,
  Phone,
  Mail,
  Globe,
  DollarSign
} from 'lucide-react';

export const ChefProfile: React.FC = () => {
  const { chefId } = useParams<{ chefId: string }>();
  const navigate = useNavigate();
  const { chefs } = useChef();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);

  const chef = chefs.find(c => c.id === chefId);

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

  const getChefAvatar = (name: string) => {
    const colors = ['#FF6B35', '#FF8A62', '#FFB59D', '#E63900', '#BF3100'];
    const colorIndex = name.length % colors.length;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[colorIndex].slice(1)}&color=ffffff&size=128&bold=true`;
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? `${chef.name} removed from your favorites` : `${chef.name} added to your favorites`,
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: `${chef.name} - Professional Chef`,
      text: `Check out ${chef.name}, a ${chef.experienceLevel.replace('-', ' ')} chef specializing in ${chef.cuisineTypes.join(', ')}.`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Chef profile link copied to clipboard.",
      });
    });
  };

  const handleContact = (method: 'phone' | 'email') => {
    if (method === 'email') {
      window.location.href = `mailto:${chef.email}`;
    } else {
      toast({
        title: "Contact Chef",
        description: "Phone contact feature coming soon!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pb-20">
      <PageHeader 
        title={chef.name}
        subtitle="Professional Chef Profile"
        showBack={true}
        onBack={() => navigate('/chef-marketplace')}
      >
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-400' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/10"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </PageHeader>

      <div className="mobile-spacing py-4 space-y-6">
        {/* Enhanced Chef Header */}
        <Card className="card-familyhub overflow-hidden">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
            <div className="absolute -bottom-8 left-6">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage 
                  src={chef.avatar || getChefAvatar(chef.name)} 
                  alt={chef.name} 
                />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                  {chef.name[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <CardContent className="pt-12 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-foreground font-poppins">{chef.name}</h1>
                  {chef.isVerified && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium font-inter">{chef.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1 font-inter">
                      ({chef.totalBookings} bookings)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs font-inter">{chef.location}</span>
                  </div>
                </div>
                
                <Badge 
                  className={
                    chef.experienceLevel === 'professional' 
                      ? 'bg-primary text-white'
                      : chef.experienceLevel === 'culinary-trained'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }
                >
                  {chef.experienceLevel.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary font-poppins mb-2">
                  ${chef.hourlyRate}/hr
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact('email')}
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact('phone')}
                  >
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 font-inter">{chef.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {chef.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs font-inter">
                  {specialty}
                </Badge>
              ))}
            </div>
            
            <Button 
              className="w-full btn-primary"
              onClick={() => navigate(`/chef-booking/${chef.id}`)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-2xl p-1">
            <TabsTrigger value="overview" className="font-inter">Overview</TabsTrigger>
            <TabsTrigger value="services" className="font-inter">Services</TabsTrigger>
            <TabsTrigger value="portfolio" className="font-inter">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews" className="font-inter">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="card-familyhub">
                <CardContent className="p-4 text-center">
                  <ChefHat className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold text-foreground font-poppins">{chef.services.length}</div>
                  <div className="text-xs text-muted-foreground font-inter">Services</div>
                </CardContent>
              </Card>
              
              <Card className="card-familyhub">
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold text-foreground font-poppins">{chef.recipes?.length || 0}</div>
                  <div className="text-xs text-muted-foreground font-inter">Recipes</div>
                </CardContent>
              </Card>
            </div>

            {/* Cuisine Types & Certifications */}
            <Card className="card-familyhub">
              <CardHeader>
                <CardTitle className="font-poppins">Cuisine Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {chef.cuisineTypes.map((cuisine, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {chef.certifications && chef.certifications.length > 0 && (
              <Card className="card-familyhub">
                <CardHeader>
                  <CardTitle className="font-poppins">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chef.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-inter">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-4 mt-6">
            {chef.services.map(service => (
              <Card key={service.id} className="card-familyhub">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
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
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="text-xs font-inter">{service.duration} min</span>
                    </div>
                    
                    {service.maxGuests && (
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span className="text-xs font-inter">Up to {service.maxGuests}</span>
                      </div>
                    )}

                    {service.includesGroceries && (
                      <div className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span className="text-xs font-inter">Groceries included</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary font-poppins">
                      ${service.price}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/chef-booking/${chef.id}?service=${service.id}`)}
                    >
                      Select Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4 mt-6">
            {chef.portfolio.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {chef.portfolio.map(item => (
                  <Card key={item.id} className="card-familyhub">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-base text-foreground font-poppins">
                          {item.title}
                        </h3>
                        {item.eventType && (
                          <Badge variant="outline" className="text-xs">
                            {item.eventType}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 font-inter">
                        {item.description}
                      </p>
                      {item.clientTestimonial && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-sm italic text-muted-foreground font-inter">
                            "{item.clientTestimonial}"
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-familyhub p-8 text-center">
                <ChefHat className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No Portfolio Items</h3>
                <p className="text-sm text-muted-foreground font-inter">
                  This chef hasn't added portfolio items yet.
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 mt-6">
            {chef.reviews && chef.reviews.length > 0 ? (
              <div className="space-y-4">
                {chef.reviews.map(review => (
                  <Card key={review.id} className="card-familyhub">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-base text-foreground font-poppins">
                          {review.clientName}
                        </h4>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 font-inter">
                        {review.comment}
                      </p>
                      <div className="text-xs text-muted-foreground font-inter">
                        {review.serviceType} • {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-familyhub p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2 font-poppins">No Reviews Yet</h3>
                <p className="text-sm text-muted-foreground font-inter">
                  This chef hasn't received any reviews yet.
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChefProfile;
