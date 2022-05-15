<template>
  <router-view />
</template>

<script setup>
import { useSupabase } from 'boot/supabase'
import { useUserStore } from 'src/stores/userStore'

const { supabase } = useSupabase()
const store = useUserStore()

store.user = supabase.auth.user()
supabase.auth.onAuthStateChange((event, session) => {
  store.setUser(session.user)
  if (process.env.DEV) console.info(event, session)
})
</script>
