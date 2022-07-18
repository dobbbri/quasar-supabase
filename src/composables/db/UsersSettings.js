import { ref } from 'vue';
import useSupabase from 'boot/supabase';
import { useAuth } from 'src/composables';

export default function useUsersSettings() {
  const loading = ref(false);
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const getSettings = async (fields = '*') => {
    loading.value = true;
    const { error, data, status } = await supabase
      .from('users_settings')
      .select(fields)
      .eq('id', user.value.id);
    loading.value = false;
    if (error && status !== 406) throw error;
    if (data.length == 0) return null;
    return data;
  };

  const addSettings = async (form) => {
    loading.value = true;
    const { error, data } = await supabase
      .from('users_settings')
      .insert([{ ...form, id: user.value.id }]);
    loading.value = false;
    if (error) throw error;
    if (data) return data[0];
    return null;
  };

  const editSettings = async (form) => {
    loading.value = true;
    const { error } = await supabase
      .from('users_settings')
      .update({ ...form })
      .eq('id', user.value.id);
    loading.value = false;
    if (error) throw error;
  };

  return {
    loading,
    supabase,
    getSettings,
    addSettings,
    editSettings
  };
}
