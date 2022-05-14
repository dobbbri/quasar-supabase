import { useSupabase } from 'boot/supabase'
import { useTools } from 'src/composables'

export default function useSettings() {
  const { setLoading, loading } = useTools()
  const { supabase } = useSupabase()

  const getSettings = async (userId, fields = '*') => {
    setLoading.list(true)
    const { error, data, status } = await supabase
      .from('settings')
      .select(fields)
      .eq('user_id', userId)
      .limit(1)
      .single()
    setLoading.list(false)
    if (error && status !== 406) {
      console.log('error: ', error)
      console.log('data: ', data)
      console.log('status: ', status)
      throw error
    }
    return data
  }

  const addSettings = async (form) => {
    setLoading.add(true)
    const { error, data } = await supabase.from('settings').insert([{ ...form }])
    setLoading.add(false)
    if (error) throw error
    return data
  }

  const editSettings = async (userId, form) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from('settings')
      .update({ ...form })
      .eq('user_id', userId)
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
