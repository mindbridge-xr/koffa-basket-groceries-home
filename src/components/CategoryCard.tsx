
import React from 'react';
import { Category } from '@/types';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
}

// Function to map category slugs to emoji icons
const getCategoryIcon = (slug: string): string => {
  const iconMap: Record<string, string> = {
    'fruits-vegetables': '🥦',
    'bread-pastries': '🍞',
    'milk-cheese': '🥛',
    'meat-fish': '🍗',
    'ingredients-spices': '🌿',
    'frozen-convenience': '❄️',
    'grain-products': '🧺',
    'snacks-sweets': '🍿',
    'beverages': '🥤',
    'household': '🧼',
    'care-health': '🧴',
    'pet-supplies': '🐾',
    'home-garden': '🏡',
    'own-items': '📝'
  };

  return iconMap[slug] || '📋';
};

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
        {getCategoryIcon(category.slug)}
      </div>
      <span className="font-medium text-sm">
        {category.name}
      </span>
    </Link>
  );
};
