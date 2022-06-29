// async function getProfile() {
//   try {
//     const user = supabase.auth.user()
//     let { data, error, status } = await supabase
//       .from('profiles')
//       .select(`username`)
//       .eq('id', user.id)
//       .single()
//
//     if (error && status !== 406) {
//       throw error
//     }
//
//     if (data) {
//       setUsername(data.username)
//     }
//   } catch (error) {
//     alert(error.message)
//   }
// }
//
// async function updateProfile() {
//   try {
//     const user = supabase.auth.user()
//     const updates = {
//       id: user.id,
//       username,
//       updated_at: new Date()
//     }
//
//     let { error } = await supabase.from('profiles').upsert(updates)
//     if (error) {
//       throw error
//     }
//   } catch (error) {
//     alert(error.message)
//   }
// }
