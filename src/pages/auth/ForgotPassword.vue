<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'

const router = useRouter()

const { loading, sendPasswordResetEmail } = useAuth()
const { notify } = useTools()
const { attr } = useDefaults()

const email = ref('')

const handleSubmit = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    notify.info(
      'Para finalizar o registro,',
      `foi enviado um email de confirmação para: ${email.value}.`
    )
    router.push({ name: 'login' })
  } catch (error) {
    notify.error('Erro ao enviar email de troca de senha.', error)
  }
}
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-form
          v-bind="attr.form"
          @submit.prevent="handleSubmit"
        >
          <p class="text-h5 text-center">Redefinir senha</p>

          <q-input
            v-bind="attr.input.basic"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            error-message="O email deve ser válido!"
            type="email"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Enviar email"
            unelevated
            no-caps
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Cancelar"
            flat
            no-caps
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'login' }"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
