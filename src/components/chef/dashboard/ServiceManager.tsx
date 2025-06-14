import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
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
}

export const ServiceManager: React.FC<ServiceManagerProps> = ({ 
  services, 
  onUpdateService, 
  onToggleService 
}) => {
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const { toast } = useToast();

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
    <Card className="card-familyhub">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-poppins">
          <span className="flex items-center space-x-2">
            <span>Your Services</span>
            <Badge variant="outline" className="text-xs">
              {services.length} active
            </Badge>
          </span>
          <Button size="sm" className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Add Service
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map(service => (
          <div key={service.id} className="relative group">
            <div className="p-4 bg-gray-50 rounded-2xl transition-all duration-200 hover:bg-gray-100">
              {editingService === service.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <Input
                    value={editValues.name}
                    onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                    className="font-medium"
                    placeholder="Service name"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={editValues.price}
                        onChange={(e) => setEditValues({...editValues, price: parseInt(e.target.value)})}
                        className="pl-10"
                        placeholder="Price"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        value={editValues.duration}
                        onChange={(e) => setEditValues({...editValues, duration: parseInt(e.target.value)})}
                        className="pl-10"
                        placeholder="Duration (min)"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleSave(service.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getServiceIcon(service.category)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base text-foreground font-poppins flex items-center space-x-2">
                          <span>{service.name}</span>
                          <Switch 
                            checked={service.active !== false}
                            onCheckedChange={(checked) => onToggleService(service.id, checked)}
                          />
                        </h4>
                        <p className="text-sm text-muted-foreground font-inter line-clamp-2 mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(service)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
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
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize text-xs">
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
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="font-medium mb-2">No services yet</p>
            <p className="text-sm">Add your first service to start accepting bookings</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
