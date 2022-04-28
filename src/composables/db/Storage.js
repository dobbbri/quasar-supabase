import { uid } from 'quasar'
import { useSupabase } from 'boot/supabase'
import { useAuth, useTools } from 'src/composables'

export default function useStorage() {
  const { setLoading, loading } = useTools()
  const { supabase, supabaseStorage } = useSupabase()
  const { user } = useAuth()

  const uploadImage = async (file, folder) => {
    setLoading.list(true)
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${user.value.id}/${uid()}.${ext}`
    const { error } = supabase.storage.from(supabaseStorage).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    setLoading.list(false)
    if (error) throw error
    return fileName
  }

  const getImageUrl = async (fileName) => {
    setLoading.list(true)
    const { publicURL, error } = supabase.storage.from(supabaseStorage).getPublicUrl(fileName)
    setLoading.list(false)
    if (error) throw error
    return publicURL
  }

  const removeImage = async (fileName) => {
    setLoading.list(true)
    const { data, error } = supabase.storage.from(supabaseStorage).remove(fileName)
    setLoading.list(false)
    if (error) throw error
    return data
  }

  return {
    supabase,
    user,
    setLoading,
    loading,
    uploadImage,
    removeImage,
    getImageUrl
  }
}
