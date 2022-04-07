import { v4 as uuidv4 } from 'uuid'
import { useSupabase } from 'boot/supabase'
import { useAuth, useLoading } from 'src/composables'

export default function useProducts() {
  const { setLoading, loading } = useLoading()
  const { supabase } = useSupabase()
  const { user } = useAuth()

  const getProducts = async () => {
    setLoading.list(true)
    const { error, data } = await supabase
      .from('products')
      .select('id, name, categories(name)')
      .eq('user_id', user.value.id)
      .order('name', { ascending: false })
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const getProduct = async (id) => {
    setLoading.list(true)
    const { error, data } = await supabase.from('products').select('id, name').eq('id', id).single()
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const addProduct = async (form) => {
    setLoading.add(true)
    const { error } = await supabase.from('products').insert([{ ...form, user_id: user.value.id }])
    setLoading.add(false)
    if (error) throw error
  }

  const editProduct = async ({ id, ...form }) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from('products')
      .update({ ...form })
      .eq('id', id)
    setLoading.edit(false)
    if (error) throw error
  }

  const removeProduct = async (id) => {
    setLoading.remove(true)
    const { error } = await supabase.from('products').delete().eq('id', id)
    setLoading.remove(false)
    if (error) throw error
  }

  const countProducts = async () => {
    setLoading.list(true)
    const { error, count } = await supabase
      .from('products')
      .select('name', { count: 'exact' })
      .eq('user_id', user.value.id)
    setLoading.list(false)
    if (error) throw error
    return count
  }

  const uploadImage = async (file) => {
    setLoading.list(true)
    const fileName = uuidv4()
    const { error } = supabase.storage
      .from('endless')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    setLoading.list(false)
    if (error) throw error
    const imageUrl = await getImageUrl(fileName)
    return imageUrl
  }

  const getImageUrl = async (fileName) => {
    setLoading.list(true)
    const { imageUrl, error } = supabase.storage.from('endless').getPublicUrl(fileName)
    setLoading.list(false)
    if (error) throw error
    return imageUrl
  }

  return {
    loading,
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct,
    countProducts,
    uploadImage,
    getImageUrl
  }
}
