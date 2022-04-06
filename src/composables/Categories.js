import { ref } from 'vue'
import { useAuth } from 'src/composables'

export default function useCategories() {
  const loading = ref(false)
  const { user } = useAuth()

  const getCategories = async () => {
    loading.value = true
    const { error, data } = await supabase
      .from('categories')
      .select('id, name, inactive')
      .eq('user_id', user.id)
      .orders('name', 'desc')
    loading.value = false
    if (error) throw error
    return data
  }

  const getCategory = async (id) => {
    loading.value = true
    const { error, data } = await supabase
      .from('categories')
      .select('id, name, inactive')
      .eq('id', id)
      .single()
    loading.value = false
    if (error) throw error
    return data
  }

  const addCategory = async (form) => {
    loading.value = true
    const { error } = await supabase.from('categories').insert([{ ...form, user_id: user.id }])
    loading.value = false
    if (error) throw error
  }

  const editCategory = async ({ id, ...form }) => {
    loading.value = true
    const { error } = await supabase
      .from('categories')
      .update({ ...form })
      .eq('id', id)
    loading.value = false
    if (error) throw error
  }

  const removeCategory = async (id) => {
    loading.value = true
    const { error } = await supabase.from('categories').delete().eq('id', id)
    loading.value = false
    if (error) throw error
  }

  const countCategories = async () => {
    loading.value = true
    const { error, count } = await supabase
      .from('categories')
      .select('name', { count: 'exact' })
      .eq('user_id', user.id)
    loading.value = false
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
