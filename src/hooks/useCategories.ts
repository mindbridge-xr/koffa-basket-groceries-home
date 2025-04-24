
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      return data
    }
  })

  return {
    categories,
    isLoading
  }
}
