
import React from 'react';

interface KoffaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const KoffaLogo: React.FC<KoffaLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const logoSizes = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${logoSizes[size]}`}>
        <img 
          src="/lovable-uploads/bdb9f2ed-22a2-40aa-8476-f1681c0b1f4d.png" 
          alt="Koffa Logo" 
          className="h-full w-auto"
        />
      </div>
      <h1 className={`font-bold mt-2 ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}>KOFFA</h1>
    </div>
  );
};
