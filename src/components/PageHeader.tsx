
import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBack?: () => void;
  onSettings?: () => void;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showSettings = false,
  onBack,
  onSettings,
  children
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-gradient-primary text-white px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors animate-press flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 font-poppins truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-white/80 font-inter truncate">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          {children}
          {showSettings && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10 min-h-[44px] min-w-[44px]"
              onClick={onSettings}
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
