import { ref, computed } from 'vue';
import useSupabase from 'boot/supabase';

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
  const loading = ref(false);
  const { supabase } = useSupabase();

  const register = async ({ email, password, ...meta }) => {
    loading.value = true;
    const { error } = await supabase.auth.signUp({ email, password }, { data: meta });
    loading.value = false;
    if (error) throw error;
  };

  const login = async ({ email, password }) => {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email, password });
    loading.value = false;
    if (error) throw error;
  };

  const logout = async () => {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    loading.value = false;
    if (error) throw error;
  };

  const isLoggedIn = computed(() => {
    return !!user.value;
  });

  const sendPasswordResetEmail = async (email) => {
    loading.value = true;
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    loading.value = false;
    if (error) throw error;
  };

  const resetPassword = async (accessToken, newPassword) => {
    loading.value = true;
    const { error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword
    });
    loading.value = false;
    if (error) throw error;
  };

  return {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    register,
    sendPasswordResetEmail,
    resetPassword
  };
}
