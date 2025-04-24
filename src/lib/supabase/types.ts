
export type Tables = {
  categories: {
    id: string
    name: string
    slug: string
    icon: string
  }
  items: {
    id: string
    name: string
    category_id: string
    icon: string
    created_at: string
  }
  lists: {
    id: string
    name: string
    owner_id: string
    shared: boolean
    created_at: string
    last_used: string
  }
  list_items: {
    id: string
    list_id: string
    item_id: string
    quantity: number
    checked: boolean
    note: string
    created_at: string
  }
  list_shares: {
    id: string
    list_id: string
    user_id: string
    created_at: string
  }
  profiles: {
    id: string
    email: string
    name: string
    avatar_url: string
    created_at: string
  }
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = { error: { code: string; message: string } }
