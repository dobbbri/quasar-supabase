import { uid } from 'quasar'
import { useSupabase } from 'boot/supabase'
import { useAuth, useTools } from 'src/composables'

export default function useApi(table) {
  const { setLoading, loading } = useTools()
  const { supabase, supabaseStorage } = useSupabase()
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
    const { error } = await supabase.from(table).insert([{ ...form, user_id: user.value.id }])
    setLoading.add(false)
    if (error) throw error
  }

  const edit = async ({ id, ...form }) => {
    setLoading.edit(true)
    const { error } = await supabase
      .from(table)
      .update({ ...form })
      .eq('id', id)
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

  const getImage = async (fileName) => {
    setLoading.add(true)
    const { publicURL, error } = supabase.storage.from(supabaseStorage).getPublicUrl(fileName)
    setLoading.add(false)
    if (error) throw error
    return publicURL
  }

  const addImage = async (folder, file) => {
    setLoading.add(true)
    const ext = file.name.split('.').pop()
    const fileName = `${folder}/${user.value.id}/${uid()}.${ext}`
    const { error } = await supabase.storage.from(supabaseStorage).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    setLoading.add(false)
    if (error) throw error
    return fileName
  }

  const editImage = async (fileName, file) => {
    setLoading.edit(true)
    const { error } = await supabase.storage.from(supabaseStorage).update(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    setLoading.edit(false)
    if (error) throw error
  }

  const removeImage = async (fileName) => {
    setLoading.remove(true)
    const { error } = await supabase.storage.from(supabaseStorage).remove(fileName)
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
    getImage,
    addImage,
    editImage,
    removeImage
  }
}
