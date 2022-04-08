import { v4 as uuidv4 } from 'uuid'
import { useApi } from 'src/composables'

export default function useProducts() {
  const { supabase, setLoading, loading, list, get, add, edit, remove, count } = useApi('products')

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
    getCategories: list,
    getCategory: get,
    addCategory: add,
    editCategory: edit,
    removeCategory: remove,
    countCategory: count,
    uploadImage,
    getImageUrl
  }
}
