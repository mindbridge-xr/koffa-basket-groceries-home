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
    md: 'h-12',
    lg: 'h-16'
  };
  const textSizes = {
    sm: 'text-uber-lg',
    md: 'text-uber-2xl',
    lg: 'text-uber-3xl'
  };
  return <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${logoSizes[size]} aspect-square bg-uber-black rounded-xl flex items-center justify-center`}>
        <span className={`font-bold text-uber-white ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}>🧺</span>
      </div>
      <h1 className={`font-bold ${textSizes[size]} text-uber-black tracking-tight`}>Goffa</h1>
    </div>;
};