import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabase } from 'boot/supabase'
import { useNotify } from 'src/composables'

export default function useAuthUser() {
  const error = ref(null)
  const loading = ref(false)
  const router = useRouter()
  const { supabase } = useSupabase()
  const { notifyError, notifySuccess } = useNotify()

  const login = async ({ email, password }) => {
    error.value = null
    loading.value = true
    const { error: err } = await supabase.auth.signIn({ email, password })
    loading.value = false
    if (err) {
      error.value = true
      notifyError('Credenciais inválidas.', err)
    }
  }

  const logout = async () => {
    error.value = null
    loading.value = true
    await supabase.auth.signOut()
    loading.value = false
  }

  const register = async ({ email, password, ...meta }) => {
    error.value = null
    loading.value = true
    const { error: err } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/index?fromEmail=registrationConfirmation"`
      }
    )
    router.push({ name: 'email-confirmation', query: { email: email } })
    loading.value = false
    if (err) {
      error.value = true
      notifyError('Credenciais inválidas.', err)
    }
  }

  const update = async (data) => {
    error.value = null
    loading.value = true
    const { error: err } = await supabase.auth.update(data)
    loading.value = false
    if (err) {
      error.value = true
      notifyError('Erro ao alterar os dados do usuário.', err)
      return
    }
    notifySuccess()
  }

  const sendPasswordRestEmail = async (email) => {
    error.value = null
    loading.value = true
    const { error: err } = await supabase.auth.api.resetPasswordForEmail(email)
    loading.value = false
    if (err) {
      error.value = true
      notifyError('Erro ao enviar o email de troca de senha.', err)
      return
    }
  }

  const resetPassword = async (accessToken, newPassword) => {
    error.value = null
    loading.value = true
    const { error: err } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword
    })
    loading.value = false
    if (err) {
      error.value = err
      notifyError('Erro ao trocar a senha do usuário.', err)
      return
    }
  }

  return {
    error,
    loading,
    user: () => supabase.auth.user(),
    isLoggedIn: () => !!supabase.auth.user(),
    login,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
  }
}
