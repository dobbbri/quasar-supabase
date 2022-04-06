<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useNotify } from 'src/composables'

const router = useRouter()

const { loading, sendPasswordResetEmail } = useAuth()
const { notifyError, notifyInfo } = useNotify()

const email = ref('')

const handleForgotPassowrd = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    notifyInfo(
      'Para finalizar o registro,',
      `um email de confirmação foi enviado para: ${email.value}.`
    )
    router.push({ name: 'login' })
  } catch (error) {
    notifyError('Erro ao enviar email de troca de senha.', error)
  }
}
</script>

<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleForgotPassowrd"
    >
      <p class="col-12 text-h5 text-center">Redefinir senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Enviar email"
            color="primary"
            class="full-width"
            outline
            rounded
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
