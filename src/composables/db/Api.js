import { ref } from 'vue';
import useSupabase from 'boot/supabase';
import { useAuth } from 'src/composables';

export default function useApi(table) {
  const loading = ref(false);
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const list = async (fields = '*') => {
    loading.value = true;
    const { error, data } = await supabase
      .from(table)
      .select(fields)
      .match({ user_id: user.value.id })
      .order('name', { ascending: true });
    loading.value = false;
    if (error) throw error;
    return data;
  };

  const get = async (id, fields = '*') => {
    loading.value = true;
    const { error, data, status } = await supabase.from(table).select(fields).match({
      user_id: user.value.id,
      id: id
    });
    loading.value = false;
    if (error && status !== 406) throw error;
    if (data.length == 0) return null;
    return data;
  };

  const add = async (form) => {
    loading.value = true;
    const { error, data } = await supabase
      .from(table)
      .insert([{ ...form, user_id: user.value.id }]);
    loading.value = false;
    if (error) throw error;
    return data;
  };

  const edit = async ({ id, ...form }) => {
    loading.value = true;
    const { error, data } = await supabase
      .from(table)
      .update({ ...form })
      .match({
        user_id: user.value.id,
        id: id
      });
    loading.value = false;
    if (error) throw error;
    return data;
  };

  const remove = async (id) => {
    loading.value = true;
    const { error, data } = await supabase.from(table).delete().match({
      user_id: user.value.id,
      id: id
    });
    loading.value = false;
    if (error) throw error;
    return data;
  };

  const count = async () => {
    loading.value = true;
    const { error, count } = await supabase
      .from(table)
      .select('id', { count: 'exact' })
      .match({ user_id: user.value.id });
    loading.value = false;
    if (error) throw error;
    return count;
  };

  return {
    supabase,
    loading,
    list,
    get,
    add,
    edit,
    remove,
    count
  };
}
