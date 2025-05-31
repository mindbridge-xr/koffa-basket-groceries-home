
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

// Mock items data
const mockItems: Tables['items'][] = [
  { id: '1', name: 'Apples', category_id: '1', icon: '🍎', created_at: new Date().toISOString() },
  { id: '2', name: 'Bananas', category_id: '1', icon: '🍌', created_at: new Date().toISOString() },
  { id: '3', name: 'Carrots', category_id: '1', icon: '🥕', created_at: new Date().toISOString() },
  { id: '4', name: 'Chicken Breast', category_id: '2', icon: '🍗', created_at: new Date().toISOString() },
  { id: '5', name: 'Salmon', category_id: '2', icon: '🐟', created_at: new Date().toISOString() },
  { id: '6', name: 'Milk', category_id: '3', icon: '🥛', created_at: new Date().toISOString() },
  { id: '7', name: 'Eggs', category_id: '3', icon: '🥚', created_at: new Date().toISOString() },
  { id: '8', name: 'Bread', category_id: '4', icon: '🍞', created_at: new Date().toISOString() }
]

export function useItems() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return mockItems
      }

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
      if (!isSupabaseConfigured) {
        return mockItems.filter(item => item.category_id === categoryId)
      }

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
