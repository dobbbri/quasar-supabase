<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'
import { PageFooter } from 'src/components'

const router = useRouter()
const route = useRoute()

const { loading, resetPassword } = useAuth()
const { notify } = useTools()
const { attr } = useDefaults()

const token = route.params.token
const password = ref('')

const handleSubmit = async () => {
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
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-form
          class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
          @submit.prevent="handleSubmit"
        >
          <p class="text-h5 text-center">Troca de senha</p>

          <q-input
            label="Nova senha"
            v-model="password"
            lazy-rules
            :rules="[(val) => val && val.length >= 6]"
            error-message="A senha deve ser possuir 6 ou mais caracteres"
          />

          <page-footer>
            <q-btn
              v-bind="attr.btn.basic"
              label="Voltar"
              outline
              class="col-5 bg-white"
              :disable="loading"
              :to="{ name: 'login' }"
            />

            <q-space />

            <q-btn
              v-bind="attr.btn.basic"
              label="Gravar"
              unelevated
              class="col-5"
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
