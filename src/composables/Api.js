import { v4 as uuidv4 } from 'uuid'
import { useSupabase } from 'src/boot/supabase'

export default function useApi() {
  const { supabase } = useSupabase()
  const user = supabase.auth.user()

  const list = async (table, columnFilter = '', filter = '') => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', user.id)
      .eq(columnFilter, filter)
    if (error) throw error
    return data
  }

  const getCount = async (table) => {
    const { error, count } = await supabase
      .from(table)
      .select('id', { count: 'exact' })
      .eq('user_id', user.id)
    if (error) throw error
    return count
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id)
    if (error) throw error
    return data[0]
  }

  const add = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([{ ...form, user_id: user.id }])
    if (error) throw error
    return data
  }

  const edit = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .eq({ id: form.id })
    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().eq({ id: id })
    if (error) throw error
    return data
  }

  const uploadImage = async (file, storage) => {
    const fileName = uuidv4()
    const { error } = supabase.storage
      .from(storage)
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    const publicUrl = await getUrlPublic(fileName, storage)
    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (fileName, storage) => {
    const { publicURL, error } = supabase.storage.from(storage).getPublicUrl(fileName)
    if (error) throw error
    return publicURL
  }

  return {
    list,
    getCount,
    getById,
    add,
    edit,
    remove,
    uploadImage,
    getUrlPublic
  }
}
