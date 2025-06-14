
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddServiceDialog } from '@/components/chef/service-onboarding/AddServiceDialog';
import { ServiceCard } from './ServiceCard';
import { ServiceEditForm } from './ServiceEditForm';
import { EmptyServicesState } from './EmptyServicesState';
import { Plus } from 'lucide-react';

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
            <div key={service.id}>
              {editingService === service.id ? (
                <div className="p-3 sm:p-4 bg-gray-50 rounded-2xl">
                  <ServiceEditForm
                    editValues={editValues}
                    onUpdate={setEditValues}
                    onSave={() => handleSave(service.id)}
                    onCancel={handleCancel}
                  />
                </div>
              ) : (
                <ServiceCard
                  service={service}
                  onEdit={handleEdit}
                  onToggle={onToggleService}
                />
              )}
            </div>
          ))}
          
          {services.length === 0 && (
            <EmptyServicesState onAddService={() => setShowAddDialog(true)} />
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
