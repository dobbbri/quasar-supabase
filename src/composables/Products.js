import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from 'src/composables'

export default function useProducts() {
  const loading = ref(false)
  const { user } = useAuth()

  const getProducts = async () => {
    loading.value = true
    const { error, data } = await supabase
      .from('products')
      .select('id, name, inactive')
      .eq('user_id', user.id)
      .orders('name', 'desc')
    loading.value = false
    if (error) throw error
    return data
  }

  const getProduct = async (id) => {
    loading.value = true
    const { error, data } = await supabase.from('products').select('id, name').eq('id', id).single()
    loading.value = false
    if (error) throw error
    return data
  }

  const addProduct = async (form) => {
    loading.value = true
    const { error } = await supabase.from('products').insert([{ ...form, user_id: user.id }])
    loading.value = false
    if (error) throw error
  }

  const editProduct = async ({ id, ...form }) => {
    loading.value = true
    const { error } = await supabase
      .from('products')
      .update({ ...form })
      .eq('id', id)
    loading.value = false
    if (error) throw error
  }

  const removeProduct = async (id) => {
    loading.value = true
    const { error } = await supabase.from('products').delete().eq('id', id)
    loading.value = false
    if (error) throw error
  }

  const countProducts = async () => {
    loading.value = true
    const { error, count } = await supabase
      .from('products')
      .select('name', { count: 'exact' })
      .eq('user_id', user.id)
    loading.value = false
    if (error) throw error
    return count
  }

  const uploadImage = async (file) => {
    loading.value = true
    const fileName = uuidv4()
    const { error } = supabase.storage
      .from('endless')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    loading.value = false
    if (error) throw error
    const imageUrl = await getImageUrl(fileName)
    return imageUrl
  }

  const getImageUrl = async (fileName) => {
    loading.value = true
    const { imageUrl, error } = supabase.storage.from('endless').getPublicUrl(fileName)
    loading.value = false
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
