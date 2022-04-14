<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from 'src/composables'

const router = useRouter()
const { user, logout } = useAuth()

const $q = useQuasar()
const firstName = ref('')

const handleLogout = async () => {
  $q.dialog({
    title: 'Sair',
    message: 'Você realmente quer ir embora?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
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
  <q-btn-dropdown
    :label="firstName"
    flat
    color="white"
  >
    <q-list>
      <q-item
        clickable
        v-close-popup
        @click="handleLogout"
      >
        <q-item-section>
          <q-item-label class="text-red text-body1">Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
