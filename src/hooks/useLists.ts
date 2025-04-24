
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'

export function useLists() {
  const queryClient = useQueryClient()

  const { data: lists, isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: async () => {
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
      toast({
        title: "Error",
        description: "Could not create list: " + error.message,
        variant: "destructive"
      })
    }
  })

  return {
    lists,
    isLoading,
    createList: createList.mutate
  }
}
