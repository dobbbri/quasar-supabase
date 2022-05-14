<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useSettings, useTools, useDefaults } from 'src/composables'
import { useSettingsStore } from 'src/stores/settingsStore'

const router = useRouter()
const store = useSettingsStore()

const { getSettings, addSettings } = useSettings()
const { loading, login } = useAuth()
const { notify } = useTools()
const { attr } = useDefaults()

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456'
})

const handleSubmit = async () => {
  try {
    const user = await login(form.value)
    const settings = await getSettings(user.id)
    if (!settings.measure_units) {
      const { documentTypes, measureUnits, paymentMethods } = store.getDefaults()
      await addSettings({
        user_id: user.id,
        measure_units: measureUnits,
        document_types: documentTypes,
        payment_methods: paymentMethods
      })
    }
    store.setSettings(settings)
    console.log('store: ', store)
    router.push({ name: 'index' })
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
