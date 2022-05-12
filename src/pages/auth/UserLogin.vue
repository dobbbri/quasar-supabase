<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'

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
    router.push({ name: 'initial-routines' })
  } catch (error) {
    notify.error('Credenciais inválidas.', error)
  }
}

onMounted(() => {
  if (isLoggedIn()) router.push({ name: 'initial-routines' })
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
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="['email']"
            error-message="O email deve ser válido!"
            type="email"
          />

          <div class="row">
            <q-input
              v-model="form.password"
              label="Senha"
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

          <q-btn
            v-bind="attr.btn.basic"
            label="Entrar"
            unelevated
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Cadastrar"
            flat
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'register' }"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
