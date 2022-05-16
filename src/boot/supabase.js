import { createClient } from '@supabase/supabase-js'

export function useSupabase() {
  const supabaseBucket = process.env.SUPABASE_BUCKET
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  // supabase.auth.onAuthStateChange((event) => {
  //   if (process.env.DEV) console.info(event)
  // })
  return { supabase, supabaseUrl, supabaseBucket }
}
