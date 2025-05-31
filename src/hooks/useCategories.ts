
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

// Mock categories data
const mockCategories: Tables['categories'][] = [
  { id: '1', name: 'Fruits & Vegetables', slug: 'fruits-vegetables', icon: '🥕', order: 1 },
  { id: '2', name: 'Meat & Seafood', slug: 'meat-seafood', icon: '🥩', order: 2 },
  { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: '🥛', order: 3 },
  { id: '4', name: 'Bakery', slug: 'bakery', icon: '🍞', order: 4 },
  { id: '5', name: 'Pantry', slug: 'pantry', icon: '🥫', order: 5 },
  { id: '6', name: 'Frozen', slug: 'frozen', icon: '🧊', order: 6 },
  { id: '7', name: 'Beverages', slug: 'beverages', icon: '🥤', order: 7 },
  { id: '8', name: 'Snacks', slug: 'snacks', icon: '🍿', order: 8 }
]

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Return mock data when Supabase is not configured
        return mockCategories
      }

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      return data as Tables['categories'][]
    }
  })

  return {
    categories,
    isLoading
  }
}
