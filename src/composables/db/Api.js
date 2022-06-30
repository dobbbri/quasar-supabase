import { computed } from 'vue';
import { useSupabase } from 'boot/supabase';
import { useTools } from 'src/composables';

export default function useApi(table) {
  const { setLoading, loading } = useTools();
  const { supabase } = useSupabase();
  const user = computed(() => supabase.auth.user());

  const list = async (fields = '*') => {
    setLoading.list(true);
    const { error, data } = await supabase
      .from(table)
      .select(fields)
      .eq('user_id', user.value.id)
      .order('name', { ascending: true });
    setLoading.list(false);
    if (error) throw error;
    return data;
  };

  const get = async (id, fields = '*') => {
    setLoading.list(true);
    const { error, data } = await supabase
      .from(table)
      .select(fields)
      .eq('user_id', user.value.id)
      .eq('id', id)
      .single();
    setLoading.list(false);
    if (error) throw error;
    return data;
  };

  const add = async (form) => {
    setLoading.add(true);
    const { error, data } = await supabase
      .from(table)
      .insert([{ ...form, user_id: user.value.id }]);
    setLoading.add(false);
    if (error) throw error;
    return data;
  };

  const edit = async ({ id, ...form }) => {
    setLoading.edit(true);
    const { error, data } = await supabase
      .from(table)
      .update({ ...form })
      .eq('user_id', user.value.id)
      .eq('id', id);
    setLoading.edit(false);
    if (error) throw error;
    return data;
  };

  const remove = async (id) => {
    setLoading.remove(true);
    const { error, data } = await supabase
      .from(table)
      .delete()
      .eq('user_id', user.value.id)
      .eq('id', id);
    setLoading.remove(false);
    if (error) throw error;
    return data;
  };

  const count = async () => {
    setLoading.list(true);
    const { error, count } = await supabase
      .from(table)
      .select('id', { count: 'exact' })
      .eq('user_id', user.value.id);
    setLoading.list(false);
    if (error) throw error;
    return count;
  };

  return {
    supabase,
    setLoading,
    loading,
    list,
    get,
    add,
    edit,
    remove,
    count
  };
}
