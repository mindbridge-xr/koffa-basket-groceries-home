import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddServiceDialog } from '@/components/chef/service-onboarding/AddServiceDialog';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  DollarSign, 
  Clock, 
  Users,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';

interface ServiceManagerProps {
  services: any[];
  onUpdateService: (serviceId: string, updates: any) => void;
  onToggleService: (serviceId: string, active: boolean) => void;
  chefProfile?: any;
}

export const ServiceManager: React.FC<ServiceManagerProps> = ({ 
  services, 
  onUpdateService, 
  onToggleService,
  chefProfile 
}) => {
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleEdit = (service: any) => {
    setEditingService(service.id);
    setEditValues({
      name: service.name,
      price: service.price,
      duration: service.duration
    });
  };

  const handleSave = (serviceId: string) => {
    onUpdateService(serviceId, editValues);
    setEditingService(null);
    setEditValues({});
    toast({
      title: "Service Updated",
      description: "Your service has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditingService(null);
    setEditValues({});
  };

  const handleAddService = (newService: any) => {
    onUpdateService('new', newService);
    toast({
      title: "Service Added Successfully!",
      description: `${newService.name} is now available for booking.`,
    });
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'private-chef': return '👨‍🍳';
      case 'cooking-class': return '📚';
      case 'meal-prep': return '🥘';
      case 'consultation': return '💬';
      default: return '🍽️';
    }
  };

  return (
    <>
      <Card className="card-familyhub">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 font-poppins">
            <span className="flex items-center space-x-2">
              <span className="text-base sm:text-lg">Your Services</span>
              <Badge variant="outline" className="text-xs">
                {services.length} active
              </Badge>
            </span>
            <Button 
              size="sm" 
              className="btn-primary w-full sm:w-auto"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              {isMobile ? 'Add Service' : 'Add New Service'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {services.map(service => (
            <div key={service.id} className="relative group">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover:bg-gray-100">
                {editingService === service.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editValues.name}
                      onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                      className="font-medium text-sm sm:text-base"
                      placeholder="Service name"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={editValues.price}
                          onChange={(e) => setEditValues({...editValues, price: parseInt(e.target.value)})}
                          className="pl-10 text-sm sm:text-base"
                          placeholder="Price"
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={editValues.duration}
                          onChange={(e) => setEditValues({...editValues, duration: parseInt(e.target.value)})}
                          className="pl-10 text-sm sm:text-base"
                          placeholder="Duration (min)"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleSave(service.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 touch-target"
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCancel}
                        className="flex-1 touch-target"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <div className="text-xl sm:text-2xl flex-shrink-0">{getServiceIcon(service.category)}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base text-foreground font-poppins flex items-center space-x-2 mb-1">
                            <span className="truncate">{service.name}</span>
                            <Switch 
                              checked={service.active !== false}
                              onCheckedChange={(checked) => onToggleService(service.id, checked)}
                              className="flex-shrink-0"
                            />
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground font-inter line-clamp-2">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(service)}
                          className="h-8 w-8 p-0 touch-target"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 touch-target"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground font-inter">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-medium text-foreground">${service.price}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{service.duration} min</span>
                        </div>
                        {service.maxGuests && (
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>Max {service.maxGuests}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <Badge variant="outline" className="capitalize text-xs px-2 py-1">
                          {service.category.replace('-', ' ')}
                        </Badge>
                        <div className="flex items-center text-xs text-green-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>Popular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-muted-foreground">
              <div className="text-3xl sm:text-4xl mb-3">🍽️</div>
              <p className="font-medium mb-2 text-sm sm:text-base">No services yet</p>
              <p className="text-xs sm:text-sm mb-4">Add your first service to start accepting bookings</p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddServiceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddService={handleAddService}
        chefProfile={chefProfile}
      />
    </>
  );
};
