<script setup>
import { ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

const router = useRouter()

const { login, isLoggedIn } = useAuthUser()

const { notifyError, notifySuccess } = useNotify()

const form = ref({
  email: '',
  password: ''
})

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' })
  }
})

const handleLogin = async () => {
  try {
    await login(form.value)
    notifySuccess('Login successfully!')
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}
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

        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required']"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
          <q-btn
            label="Esqueceu sua senha?"
            color="primary"
            class="text-right"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Registro"
            color="primary"
            class="full-width"
            flat
            to="/register"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
