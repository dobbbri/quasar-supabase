import { ref, computed } from 'vue'
import { useSupabase } from 'boot/supabase'

export default function useAuthUser() {
  const loading = ref(false)
  const { supabase } = useSupabase()

  const register = async ({ email, password, ...meta }) => {
    loading.value = true
    const { error, user } = await supabase.auth.signUp({ email, password }, { data: meta })
    loading.value = false
    if (error) throw error
    return user
  }

  const login = async ({ email, password }) => {
    loading.value = true
    const { error, user } = await supabase.auth.signIn({ email, password })
    loading.value = false
    if (error) throw error
    return user
  }

  const logout = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    loading.value = false
    if (error) throw error
  }

  const update = async (data) => {
    loading.value = true
    const { error } = await supabase.auth.update(data)
    loading.value = false
    if (error) throw error
  }

  const sendPasswordResetEmail = async (email) => {
    loading.value = true
    const { error } = await supabase.auth.api.resetPasswordForEmail(email)
    loading.value = false
    if (error) throw error
  }

  const resetPassword = async (accessToken, newPassword) => {
    loading.value = true
    const { error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword
    })
    loading.value = false
    if (error) throw error
  }

  return {
    isLoggedIn: () => !!supabase.auth.user(),
    user: computed(() => supabase.auth.user()),
    loading,
    login,
    logout,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword
  }
}
