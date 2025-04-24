
import React from 'react';
import { Category } from '@/types';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`}
      className="category-item"
    >
      <span className="font-medium">{category.name}</span>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
};
