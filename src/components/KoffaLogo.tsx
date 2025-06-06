
import React from 'react';

interface KoffaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
}

export const KoffaLogo: React.FC<KoffaLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'default'
}) => {
  const logoSizes = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  const textSizes = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const emojiSizes = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'white':
        return {
          container: 'bg-white/20 backdrop-blur-sm',
          text: 'text-white'
        };
      case 'dark':
        return {
          container: 'bg-gray-900',
          text: 'text-white'
        };
      default:
        return {
          container: 'bg-primary',
          text: 'text-foreground'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${logoSizes[size]} aspect-square ${styles.container} rounded-2xl flex items-center justify-center shadow-lg`}>
        <span className={`${emojiSizes[size]} font-bold`}>🧺</span>
      </div>
      <h1 className={`font-bold ${textSizes[size]} ${styles.text} tracking-tight font-poppins`}>
        FamilyHub
      </h1>
    </div>
  );
};
