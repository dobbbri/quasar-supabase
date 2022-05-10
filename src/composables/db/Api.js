import { uid } from 'quasar'
import { useSupabase } from 'boot/supabase'
import { useAuth, useTools } from 'src/composables'

export default function useApi(table) {
  const { setLoading, loading } = useTools()
  const { supabase, supabaseUrl, supabaseBucket } = useSupabase()
  const { user } = useAuth()

  const list = async (fields = '*') => {
    setLoading.list(true)
    const { error, data } = await supabase
      .from(table)
      .select(fields)
      .eq('user_id', user.value.id)
      .order('name', { ascending: true })
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const get = async (id, fields = '*') => {
    setLoading.list(true)
    const { error, data } = await supabase.from(table).select(fields).eq('id', id).single()
    setLoading.list(false)
    if (error) throw error
    return data
  }

  const add = async (form) => {
    setLoading.add(true)
    const { error } = await supabase
      .from(table)
      .insert([{ ...form, user_id: user.value.id }])
      .single()
    setLoading.add(false)
    if (error) throw error
  }

  const edit = async ({ id, ...form }) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from(table)
      .update({ ...form })
      .eq('id', id)
      .single()
    setLoading.edit(false)
    if (error) throw error
  }

  const remove = async (id) => {
    setLoading.remove(true)
    const { error } = await supabase.from(table).delete().eq('id', id)
    setLoading.remove(false)
    if (error) throw error
  }

  const count = async () => {
    setLoading.list(true)
    const { error, count } = await supabase
      .from(table)
      .select('id', { count: 'exact' })
      .eq('user_id', user.value.id)
    setLoading.list(false)
    if (error) throw error
    return count
  }

  const addImage = async (folder, file) => {
    setLoading.add(true)
    const extension = file.name.split('.').pop()
    const imageName = `${folder}/${uid()}.${extension}`
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .upload(`${user.value.id}/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false
      })
    setLoading.add(false)
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
    setLoading.edit(true)
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .update(`${user.value.id}/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false
      })
    setLoading.edit(false)
    if (error) throw error
  }

  const removeImage = async (imageName) => {
    setLoading.remove(true)
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .remove([`${user.value.id}/${imageName}`])
    setLoading.remove(false)
    if (error) throw error
  }

  return {
    supabase,
    user,
    setLoading,
    loading,
    list,
    get,
    add,
    edit,
    remove,
    count,
    addImage,
    editImage,
    removeImage,
    getImageURL
  }
}
