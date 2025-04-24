
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
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
