import { uid } from 'quasar'

export default function useImage(supabase, supabaseStorage, user) {
  const getImageUrl = async (fileName) => {
    const { publicURL, error } = await supabase.storage.from(supabaseStorage).getPublicUrl(fileName)
    return { publicURL, error }
  }

  const addImageFile = async (folder, file) => {
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${user.value.id}/${uid()}.${ext}`
    const { error } = await supabase.storage.from(supabaseStorage).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    return { fileName, error }
  }

  const editImageFile = async (fileName, file) => {
    const { error } = await supabase.storage.from(supabaseStorage).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    return { fileName, error }
  }

  const removeImageFile = async (fileName) => {
    const { data, error } = await supabase.storage.from(supabaseStorage).remove(fileName)
    return { data, error }
  }

  return {
    getImageUrl,
    addImageFile,
    editImageFile,
    removeImageFile
  }
}
