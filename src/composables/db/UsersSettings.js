import { computed } from 'vue';
import { useSupabase } from 'boot/supabase';

export default function useUsersSettings() {
  const { supabase } = useSupabase();
  const user = computed(() => supabase.auth.user());

  const getSettings = async (fields = '*') => {
    const { error, data, status } = await supabase
      .from('users_settings')
      .select(fields)
      .eq('id', user.value.id);
    if (error && status !== 406) throw error;
    if (data) return data[0];
    return null;
  };

  const addSettings = async (form) => {
    const { error, data } = await supabase
      .from('users_settings')
      .insert([{ ...form, id: user.value.id }]);
    if (error) throw error;
    if (data) return data[0];
    return null;
  };

  const editSettings = async (form) => {
    const { error } = await supabase
      .from('users_settings')
      .update({ ...form })
      .eq('id', user.value.id);
    if (error) throw error;
  };

  return {
    supabase,
    getSettings,
    addSettings,
    editSettings
  };
}
