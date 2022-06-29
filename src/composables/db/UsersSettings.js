import { computed } from 'vue';
import { useSupabase } from 'boot/supabase';
import { useTools } from 'src/composables';

export default function useUsersSettings() {
  const { setLoading, loading } = useTools();
  const { supabase } = useSupabase();
  const user = computed(() => supabase.auth.user());

  const getSettings = async (fields = '*') => {
    setLoading.list(true);
    const { error, data, status } = await supabase
      .from('users_settings')
      .select(fields)
      .eq('id', user.value.id)
      .limit(1)
      .single();
    setLoading.list(false);
    if (error && status !== 406) throw error;
    return data;
  };

  const addSettings = async (form) => {
    setLoading.add(true);
    const { error, data } = await supabase
      .from('users_settings')
      .insert([{ ...form, id: user.value.id }])
      .single();
    setLoading.add(false);
    if (error) throw error;
    return data;
  };

  const editSettings = async (form) => {
    setLoading.edit(true);
    const { error } = await supabase
      .from('users_settings')
      .update({ ...form })
      .eq('id', user.value.id);
    setLoading.edit(false);
    if (error) throw error;
  };

  return {
    supabase,
    setLoading,
    loading,
    getSettings,
    addSettings,
    editSettings
  };
}
