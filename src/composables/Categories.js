import { useSupabase } from 'boot/supabase'
import { useAuth, useLoading } from 'src/composables'

export default function useCategories() {
  const { setLoading, loading } = useLoading()
  const { supabase } = useSupabase()
  const {user} = useAuth()

  const getCategories = async () => {
    setLoading.list(true)
    const { error, data } = await supabase
      .from('categories')
      .select('id, name, inactive')
      .eq('user_id', user.value.id)
      .order('name', { ascending: false })
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const getCategory = async (id) => {
    setLoading.list(true)
    const { error, data } = await supabase
      .from('categories')
      .select('id, name, inactive')
      .eq('id', id)
      .single()
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const addCategory = async (form) => {
    setLoading.add(true)
    const { error } = await supabase.from('categories').insert([{ ...form, user_id: user.value.id }])
    setLoading.add(false)
    if (error) throw error
  }

  const editCategory = async ({ id, ...form }) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from('categories')
      .update({ ...form })
      .eq('id', id)
    setLoading.edit(false)
    if (error) throw error
  }

  const removeCategory = async (id) => {
    setLoading.remove(true)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    setLoading.remove(false)
    if (error) throw error
  }

  const countCategories = async () => {
    setLoading.list(true)
    const { error, count } = await supabase
      .from('categories')
      .select('name', { count: 'exact' })
      .eq('user_id', user.value.id)
    setLoading.list(false)
    if (error) throw error
    return count
  }

  return {
    loading,
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
    countCategories
  }
}
