import { createClient } from '@supabase/supabase-js'

export function useSupabase() {
  const supabaseBucket = process.env.SUPABASE_BUCKET
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  return { supabase, supabaseUrl, supabaseBucket }
}
