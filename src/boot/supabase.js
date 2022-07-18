import { createClient } from '@supabase/supabase-js';
import { useAuth } from 'src/composables';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuth();
  user.value = session?.user || null;

  if (event == 'SIGNED_IN') {
    console.log('SIGNED_IN', session);
  } else if (event == 'SIGNED_OUT') {
    console.log('SIGNED_OUT', session);
  }
});

export default function useSupabase() {
  return { supabase };
}
