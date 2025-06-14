
import React from 'react';
import { ServiceManager } from './ServiceManager';
import { RecentActivityCard } from './RecentActivityCard';

interface OverviewSectionProps {
  chefProfile: any;
  onUpdateService: (serviceId: string, updates: any) => void;
  onToggleService: (serviceId: string, active: boolean) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  chefProfile,
  onUpdateService,
  onToggleService
}) => {
  return (
    <div className="space-y-6">
      <ServiceManager 
        services={chefProfile.services}
        onUpdateService={onUpdateService}
        onToggleService={onToggleService}
      />
      <RecentActivityCard />
    </div>
  );
};
