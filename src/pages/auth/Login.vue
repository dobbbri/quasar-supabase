<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'
import { PageFooter } from 'src/components'

const router = useRouter()

const { loading, login, isLoggedIn } = useAuth()
const { notify } = useTools()
const { attr } = useDefaults()

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456'
})

const handleSubmit = async () => {
  try {
    await login(form.value)
    router.push({ name: 'index' })
  } catch (error) {
    notify.error('Credenciais inválidas.', error)
  }
}

onMounted(() => {
  if (isLoggedIn()) router.push({ name: 'index' })
})
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-form
          class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
          @submit.prevent="handleSubmit"
        >
          <p class="text-h5 text-center">Identificação</p>

          <q-input
            label="Email"
            v-model="form.email"
            lazy-rules
            :rules="['email']"
            error-message="O email deve ser válido!"
            type="email"
          />

          <div class="row">
            <q-input
              label="Senha"
              v-model="form.password"
              class="col-12"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
              error-message="A senha deve ser informada!"
            />

            <q-btn
              v-bind="attr.btn.basic"
              label="Esqueceu sua senha?"
              class="q-ml-auto"
              flat
              :to="{ name: 'forgot-password' }"
              size="sm"
            />
          </div>

          <page-footer>
            <q-btn
              v-bind="attr.btn.basic"
              label="Registro"
              outline
              class="col-5 bg-white"
              :disable="loading"
              :to="{ name: 'register' }"
            />

            <q-space />

            <q-btn
              v-bind="attr.btn.basic"
              label="Entrar"
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
