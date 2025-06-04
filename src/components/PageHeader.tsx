
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
    <div className="bg-gradient-primary text-white mobile-padding">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors animate-press"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-1 font-poppins">{title}</h1>
            {subtitle && (
              <p className="text-sm text-white/80 font-inter">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {children}
          {showSettings && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
              onClick={onSettings}
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
