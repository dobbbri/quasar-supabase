<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'
import { PageFooter } from 'src/components'

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
          class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
          @submit.prevent="handleSubmit"
        >
          <p class="text-h5 text-center">Redefinir senha</p>

          <q-input
            label="Email"
            v-model="email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Email is required']"
            type="email"
          />

          <page-footer>
            <q-btn
              v-bind="attr.btn.basic"
              label="Cancelar"
              outline
              class="col-4 bg-white"
              :disable="loading"
              :to="{ name: 'login' }"
            />

            <q-space />

            <q-btn
              v-bind="attr.btn.basic"
              label="Enviar email"
              unelevated
              class="col-4"
              :loading="loading"
              :disable="loading"
              type="submit"
            />
          </page-footer>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
