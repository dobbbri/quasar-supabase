<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useTools, useDefaults } from 'src/composables'

const router = useRouter()

const { loading, register } = useAuth()
const { notify } = useTools()
const { attr } = useDefaults()

const form = ref({
  name: 'Sergio Dobri',
  email: 'sergiodobri@gmail.com',
  password: '123456'
})

const handleSubmit = async () => {
  try {
    await register(form.value)
    notify.info(
      'Para finalizar o registro,',
      `um email de confirmação foi enviado para: ${form.value.email}.`
    )
    router.push({ name: 'login' })
  } catch (error) {
    notify.error('Credenciais inválidas', error)
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
          <p class="text-h5 text-center">Registro</p>

          <q-input
            v-model="form.name"
            label="Nome"
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            error-message="O nome deve ser informado!"
          />

          <q-input
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="['email']"
            error-message="O email deve ser válido!"
            type="email"
          />

          <q-input
            v-model="form.password"
            label="Senha"
            lazy-rules
            :rules="[(val) => val && val.length >= 6]"
            error-message="A senha deve ser possuir 6 ou mais caracteres"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Gravar"
            unelevated
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Identificar"
            flat
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'login' }"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
