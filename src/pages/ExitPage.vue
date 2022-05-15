<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables'
import { PageHeader } from 'src/components'
import { useUserStore } from 'src/stores/userStore'

const router = useRouter()
const store = useUserStore()
const { logout } = useAuth()

const handleLogout = async () => {
  try {
    store.logout()
    await logout()
  } catch (error) {
    console.log('logout error : ', error)
  } finally {
    router.replace({ name: 'login' })
  }
}

onMounted(() => handleLogout())
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Endless</template>
    </page-header>
  </q-page>
</template>
