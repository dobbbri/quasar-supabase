import { ref } from "vue";
import { useSupabase } from "boot/supabase";
import { useUserStore } from "src/stores/userStore";

export default function useAuthUser() {
  const loading = ref(false);
  const { supabase } = useSupabase();
  const store = useUserStore();

  const register = async ({ email, password, ...meta }) => {
    loading.value = true;
    const { session, error } = await supabase.auth.signUp(
      { email, password },
      { data: meta }
    );
    if (session) store.setUser(session.user);
    loading.value = false;
    if (error) throw error;
  };

  const login = async ({ email, password }) => {
    loading.value = true;
    const { session, error } = await supabase.auth.signIn({ email, password });
    if (session) store.setUser(session.user);
    loading.value = false;
    if (error) throw error;
  };

  const logout = async () => {
    loading.value = true;
    store.logout();
    const { error } = await supabase.auth.signOut();
    loading.value = false;
    if (error) throw error;
  };

  const sendPasswordResetEmail = async (email) => {
    loading.value = true;
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    loading.value = false;
    if (error) throw error;
  };

  const resetPassword = async (accessToken, newPassword) => {
    loading.value = true;
    const { error } = await supabase.auth.api.updateUser(accessToken, {
      password: newPassword,
    });
    loading.value = false;
    if (error) throw error;
  };

  return {
    loading,
    login,
    logout,
    register,
    sendPasswordResetEmail,
    resetPassword,
  };
}
