import { useSupabase } from 'boot/supabase'
import { useAuth, useTools } from 'src/composables'

export default function useSettings() {
  const { setLoading, loading } = useTools()
  const { supabase } = useSupabase()
  const { user } = useAuth()

  const getSettings = async (fields = '*') => {
    setLoading.list(true)
    const { data, error, status } = await supabase
      .from('settings')
      .select(fields)
      .eq('user_id', user.value.id)
      .maybeSingle()
    setLoading.list(false)
    if (error && status !== 406) throw error
    return data
  }

  const addSettings = async (form) => {
    setLoading.add(true)
    const { error } = await supabase.from('settings').insert([{ ...form, user_id: user.value.id }])
    setLoading.add(false)
    if (error) throw error
  }

  const editSettings = async ({ id, ...form }) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from('settings')
      .update({ ...form })
      .eq('id', id)
    setLoading.edit(false)
    if (error) throw error
  }

  return {
    supabase,
    setLoading,
    loading,
    getSettings,
    addSettings,
    editSettings
  }
}
