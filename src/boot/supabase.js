import { createClient } from '@supabase/supabase-js'

export function useSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const supabaseStorage = process.env.SUPABASE_STORAGE

  supabase.auth.onAuthStateChange((event, session) => {
    if (process.env.DEV) console.info(event, session)
  })

  return { supabase, supabaseStorage }
}
