import { createClient } from '@supabase/supabase-js'

export type ThoughtType = 'note' | 'video' | 'code' | 'music'

export interface Thought {
  id: string
  created_at: string
  type: ThoughtType
  title: string | null
  body: string | null
  url: string | null
  language: string | null
  tags: string[] | null
  published: boolean
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getThoughts(): Promise<Thought[]> {
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createThought(thought: Omit<Thought, 'id' | 'created_at'>): Promise<Thought> {
  const { data, error } = await supabase
    .from('thoughts')
    .insert(thought)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteThought(id: string): Promise<void> {
  const { error } = await supabase
    .from('thoughts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function togglePublished(id: string, published: boolean): Promise<void> {
  const { error } = await supabase
    .from('thoughts')
    .update({ published })
    .eq('id', id)

  if (error) throw error
}