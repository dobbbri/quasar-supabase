import { computed } from 'vue';
import { useSupabase } from 'boot/supabase';

export default function useApiImage() {
  const { supabase, supabaseUrl, supabaseBucket } = useSupabase();
  const user = computed(() => supabase.auth.user());

  const addImage = async (folder, file) => {
    const extension = file.name.split('.').pop();
    const filePath = `${folder}/${Math.random()}.${extension}`;
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .upload(`${user.value.id}/${filePath}`, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) throw error;
    return filePath;
  };

  const getImageURL = (filePath) => {
    if (filePath) {
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${user.value.id}/${filePath}`;
      return imageUrl;
    }
    return;
  };

  // const getImage = async (fileName) => {
  //   setLoading.add(true)
  //   const { publicURL, error } = supabase.storage.from(supabaseBucket).getPublicUrl(fileName)
  //   setLoading.add(false)
  //   if (error) throw error
  //   return publicURL
  // }

  const editImage = async (filePath, file) => {
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .update(`${user.value.id}/${filePath}`, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) throw error;
  };

  const removeImage = async (filePath) => {
    const { error } = await supabase.storage
      .from(supabaseBucket)
      .remove([`${user.value.id}/${filePath}`]);
    if (error) throw error;
  };

  return {
    getImageURL,
    addImage,
    editImage,
    removeImage
  };
}
