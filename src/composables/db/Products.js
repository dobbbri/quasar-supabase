import { uid } from 'quasar'
import { useApi } from 'src/composables'

export default function useProducts() {
  const { supabase, setLoading, loading, list, get, add, edit, remove, count } = useApi('products')
  const storage = process.env.SUPABASE_STORAGE

  const uploadImage = async (file) => {
    setLoading.list(true)
    const fileName = uid()
    const { error } = supabase.storage
      .from(storage)
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    setLoading.list(false)
    if (error) throw error
    const imageUrl = await getImageUrl(fileName)
    return imageUrl
  }

  const getImageUrl = async (fileName) => {
    setLoading.list(true)
    const { imageUrl, error } = supabase.storage.from(storage).getPublicUrl(fileName)
    setLoading.list(false)
    if (error) throw error
    return imageUrl
  }

  return {
    loading,
    getProducts: list,
    getProduct: get,
    addProduct: add,
    editProduct: edit,
    removeProduct: remove,
    countProduct: count,
    uploadImage,
    getImageUrl
  }
}
