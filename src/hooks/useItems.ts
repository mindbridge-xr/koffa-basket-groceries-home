
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export function useItems() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error
      return data as Tables['items'][]
    }
  })

  return {
    items,
    isLoading
  }
}

export function useItemsByCategory(categoryId: string) {
  const { data: items, isLoading } = useQuery({
    queryKey: ['items', 'category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('category_id', categoryId)
        .order('name', { ascending: true })

      if (error) throw error
      return data as Tables['items'][]
    },
    enabled: !!categoryId
  })

  return {
    items,
    isLoading
  }
}
