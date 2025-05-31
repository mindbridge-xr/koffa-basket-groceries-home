
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'

// Mock data for when Supabase is not configured
const mockLists = [
  {
    id: 'mock-1',
    name: 'Weekly Groceries',
    owner_id: 'mock-user',
    shared: false,
    created_at: new Date().toISOString(),
    last_used: new Date().toISOString(),
    list_items: []
  },
  {
    id: 'mock-2',
    name: 'Party Shopping',
    owner_id: 'mock-user',
    shared: true,
    created_at: new Date().toISOString(),
    last_used: new Date().toISOString(),
    list_items: []
  }
]

export function useLists() {
  const queryClient = useQueryClient()

  const { data: lists, isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        // Return mock data when Supabase is not configured
        return mockLists
      }

      const { data, error } = await supabase
        .from('lists')
        .select(`
          *,
          list_items (
            *,
            items (*)
          )
        `)
        .order('last_used', { ascending: false })

      if (error) throw error
      return data
    }
  })

  const createList = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!isSupabaseConfigured) {
        // Mock creation for demo purposes
        const newList = {
          id: `mock-${Date.now()}`,
          name,
          owner_id: 'mock-user',
          shared: false,
          created_at: new Date().toISOString(),
          last_used: new Date().toISOString(),
          list_items: []
        }
        return newList
      }

      const { data, error } = await supabase
        .from('lists')
        .insert({ name })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      toast({
        title: "List created",
        description: "Your new list has been created successfully"
      })
    },
    onError: (error) => {
      console.error('Error creating list:', error)
      toast({
        title: "Error",
        description: isSupabaseConfigured 
          ? "Could not create list: " + error.message
          : "Demo mode: List creation simulated",
        variant: isSupabaseConfigured ? "destructive" : "default"
      })
    }
  })

  const createListWithItems = useMutation({
    mutationFn: async ({ name, items }: { name: string; items: string[] }) => {
      if (!isSupabaseConfigured) {
        // Mock creation for demo purposes
        const newList = {
          id: `mock-${Date.now()}`,
          name,
          owner_id: 'mock-user',
          shared: false,
          created_at: new Date().toISOString(),
          last_used: new Date().toISOString(),
          list_items: items.map((item, index) => ({
            id: `mock-item-${index}`,
            name: item,
            completed: false
          }))
        }
        
        // Add to mock lists for persistence in demo mode
        mockLists.unshift(newList)
        
        return newList
      }

      // Create the list first
      const { data: listData, error: listError } = await supabase
        .from('lists')
        .insert({ name })
        .select()
        .single()

      if (listError) throw listError

      // Create items and add them to the list
      if (items.length > 0) {
        // First, check if items exist or create them
        const itemPromises = items.map(async (itemName) => {
          const { data: existingItem } = await supabase
            .from('items')
            .select('id')
            .eq('name', itemName)
            .single()

          if (existingItem) {
            return existingItem.id
          } else {
            const { data: newItem, error } = await supabase
              .from('items')
              .insert({ name: itemName, category_id: null })
              .select('id')
              .single()
            
            if (error) throw error
            return newItem.id
          }
        })

        const itemIds = await Promise.all(itemPromises)

        // Add items to the list
        const listItemsData = itemIds.map(itemId => ({
          list_id: listData.id,
          item_id: itemId,
          completed: false
        }))

        const { error: listItemsError } = await supabase
          .from('list_items')
          .insert(listItemsData)

        if (listItemsError) throw listItemsError
      }

      return listData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
    },
    onError: (error) => {
      console.error('Error creating list with items:', error)
      throw error
    }
  })

  return {
    lists,
    isLoading,
    createList: createList.mutate,
    createListWithItems: createListWithItems.mutateAsync,
    isConfigured: isSupabaseConfigured
  }
}
