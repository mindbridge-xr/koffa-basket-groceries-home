
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServiceOnboardingData, SERVICE_CATEGORIES, SERVICE_TEMPLATES } from '@/types/serviceOnboarding';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceTypeStepProps {
  data: ServiceOnboardingData;
  onUpdate: (updates: Partial<ServiceOnboardingData>) => void;
}

export const ServiceTypeStep: React.FC<ServiceTypeStepProps> = ({ data, onUpdate }) => {
  const isMobile = useIsMobile();

  const handleCategorySelect = (categoryId: string) => {
    onUpdate({ category: categoryId as any, template: '' });
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = SERVICE_TEMPLATES[data.category as keyof typeof SERVICE_TEMPLATES]?.find(t => t.id === templateId);
    if (template) {
      onUpdate({ 
        template: templateId,
        name: template.name,
        description: template.description,
        duration: template.duration,
        maxGuests: template.maxGuests,
        price: template.suggestedPrice
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">What type of service would you like to offer?</h3>
        <p className="text-muted-foreground text-sm">Choose the category that best describes your service</p>
      </div>

      {/* Service Categories */}
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {SERVICE_CATEGORIES.map(category => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              data.category === category.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Templates */}
      {data.category && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Choose a template to get started</h4>
            <p className="text-sm text-muted-foreground">You can customize everything in the next steps</p>
          </div>
          
          <div className="space-y-3">
            {SERVICE_TEMPLATES[data.category as keyof typeof SERVICE_TEMPLATES]?.map(template => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  data.template === template.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-sm">{template.name}</h5>
                    <Badge variant="outline" className="text-xs">
                      ${template.suggestedPrice}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{template.duration} min</span>
                    <span>•</span>
                    <span>Up to {template.maxGuests} guests</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Custom Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-md border-dashed ${
                data.template === 'custom' 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onUpdate({ template: 'custom', name: '', description: '', duration: 120, maxGuests: 4, price: 100 })}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">✨</div>
                <h5 className="font-medium text-sm mb-1">Create Custom Service</h5>
                <p className="text-xs text-muted-foreground">Start from scratch with your own details</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
