<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useNotify } from 'src/composables'

const router = useRouter()

const { loading, register } = useAuth()
const { notifyError, notifyInfo } = useNotify()

const form = ref({
  name: 'Sergio Dobri',
  email: 'sergiodobri@gmail.com',
  password: '123456'
})

const handleRegister = async () => {
  try {
    await register(form.value)
    notifyInfo(
      'Para finalizar o registro,',
      `um email de confirmação foi enviado para: ${form.value.email}.`
    )
    router.push({ name: 'login' })
  } catch (error) {
    notifyError('Credenciais inválidas', error)
  }
}
</script>

<template>
  <q-page padding>
    <q-form
      class="row justify-center"
      @submit.prevent="handleRegister"
    >
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name is required']"
        />

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
          :rules="[(val) => (val && val.length >= 6) || 'Password is required and 6 characters']"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            label="Login"
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
