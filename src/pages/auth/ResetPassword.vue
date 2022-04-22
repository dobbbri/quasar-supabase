<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth, useTools } from 'src/composables'

const router = useRouter()
const route = useRoute()

const { loading, resetPassword } = useAuth()
const { notify } = useTools()

const token = route.params.token
const password = ref('')

const handlePasswordReset = async () => {
  try {
    await resetPassword(token, password.value)
    notify.success('Senha alterada.')
    router.push({ name: 'login' })
  } catch (error) {
    notify.error('Erro ao trocar a senha.', error)
  }
}
</script>

<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handlePasswordReset"
    >
      <p class="col-12 text-h5 text-center">Troca de senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[(val) => (val && val.length >= 6) || 'Password is required']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Gravar"
            color="primary"
            class="full-width"
            outline
            rounded
            :loading="loading"
            :disable="loading"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
