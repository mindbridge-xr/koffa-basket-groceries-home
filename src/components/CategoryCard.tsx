
import React from 'react';
import { Tables } from '@/lib/supabase/types';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Tables['categories'];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg",
        "bg-white shadow-sm hover:shadow-md transition-all duration-200",
        "aspect-square text-center border border-muted"
      )}
    >
      <div className="text-4xl mb-3">
        {category.icon}
      </div>
      <span className="font-medium text-sm">
        {category.name}
      </span>
    </Link>
  );
};
