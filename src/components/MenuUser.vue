<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools } from 'src/composables'

const router = useRouter()
const { user, logout } = useAuth()
const { confirm } = useTools()

const firstName = ref('')

const handleLogout = async () => {
  confirm.exit().onOk(async () => {
    try {
      await logout()
      router.replace({ name: 'login' })
    } catch (error) {
      console.log('logout error : ', error)
    }
  })
}

onMounted(() => {
  firstName.value = user.value.user_metadata.name.split(' ')[0]
})
</script>

<template>
  <q-btn-dropdown :label="firstName" flat color="primary">
    <q-list>
      <q-item v-close-popup clickable @click="handleLogout">
        <q-item-section>
          <q-item-label class="text-red text-body1">Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
