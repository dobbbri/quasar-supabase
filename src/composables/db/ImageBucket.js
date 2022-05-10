import { uid } from 'quasar'
import { useSupabase } from 'boot/supabase'
import { useAuth } from 'src/composables'

export default function useImageBucket() {
  const { supabase, supabaseUrl, supabaseBucket } = useSupabase()
  const { user } = useAuth()

  const addImage = async (folder, file) => {
    const extension = file.name.split('.').pop()
    const imageName = `${folder}/${uid()}.${extension}`
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .upload(`${user.value.id}/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false
      })
    if (error) throw error
    return imageName
  }

  const getImageURL = (imageName) => {
    if (imageName) {
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${user.value.id}/${imageName}`
      return imageUrl
    }
    return
  }

  // const getImage = async (fileName) => {
  //   setLoading.add(true)
  //   const { publicURL, error } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName)
  //   setLoading.add(false)
  //   if (error) throw error
  //   return publicURL
  // }

  const editImage = async (imageName, file) => {
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .update(`${user.value.id}/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false
      })
    if (error) throw error
  }

  const removeImage = async (imageName) => {
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .remove([`${user.value.id}/${imageName}`])
    if (error) throw error
  }

  return {
    getImageURL,
    addImage,
    editImage,
    removeImage
  }
}
