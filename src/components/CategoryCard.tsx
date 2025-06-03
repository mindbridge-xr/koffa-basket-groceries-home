
import React from 'react';
import { Tables } from '@/lib/supabase/types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Tables['categories'];
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`}
      className="card-uber-hover p-4 animate-press block"
    >
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-uber-gray-50 rounded-xl flex items-center justify-center mx-auto">
          <span className="text-3xl">{category.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-uber-base text-uber-black mb-1">{category.name}</h3>
          <div className="flex items-center justify-center text-uber-gray-400">
            <span className="text-uber-xs">Browse items</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};
