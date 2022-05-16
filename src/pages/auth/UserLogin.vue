<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'

const router = useRouter()

const { loading, login } = useAuth()
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
    notify.error('Credenciais inválidas', error)
    throw error
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
          <p class="text-h5 text-center">Entrar</p>

          <q-input
            v-bind="attr.input.basic"
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="['email']"
            error-message="O email deve ser válido!"
            type="email"
          />

          <div class="row">
            <q-input
              v-bind="attr.input.basic"
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
            no-caps
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Novo usuário? Crie uma conta"
            flat
            no-caps
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'register' }"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
