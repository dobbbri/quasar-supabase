<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useNotify } from 'src/composables'

const router = useRouter()

const { loading, login, isLoggedIn } = useAuth()
const { notifyError } = useNotify()

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456'
})

const handleLogin = async () => {
  try {
    await login(form.value)
    router.push({ name: 'index' })
  } catch (error) {
    notifyError('Credenciais inbálidas.', error)
  }
}

onMounted(() => {
  if (isLoggedIn()) router.push({ name: 'index' })
})
</script>

<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleLogin"
    >
      <p class="col-12 text-h5 text-center">Identificação</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <div>
          <q-input
            label="Password"
            v-model="form.password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Password is required']"
          />
          <q-btn
            label="Esqueceu sua senha?"
            color="primary"
            class="float-right"
            rounded
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>

        <div class="full-width q-pt-xl">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            outline
            rounded
            :loading="loading"
            :disable="loading"
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Registro"
            color="primary"
            class="full-width"
            rounded
            flat
            to="/register"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
