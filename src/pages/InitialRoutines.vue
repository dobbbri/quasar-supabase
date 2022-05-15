<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useSettings, useTools } from 'src/composables'
import { useSettingsStore } from 'src/stores/settingsStore'

const $q = useQuasar()
const router = useRouter()
const store = useSettingsStore()

const { getSettings, addSettings } = useSettings()
const { notify } = useTools()

const handleSettings = async () => {
  try {
    $q.loading.show()
    let settings = await getSettings()
    console.log('set: ', settings)
    if (settings) {
      store.setSettings(settings)
    } else {
      const { documentTypes, measureUnits, paymentMethods } = store.getDefaults()
      settings = await addSettings({
        measure_units: measureUnits,
        document_types: documentTypes,
        payment_methods: paymentMethods
      })
      console.log('set2: ', settings)
      store.setSettings(settings)
    }
    console.log('store: ', store)
    $q.loading.hide()
    router.push({ name: 'index' })
  } catch (error) {
    $q.loading.hide()
    notify.error('Erro ao executar as rotinas iniciais.', error)
  }
}

onMounted(() => {
  handleSettings()
})
</script>

<template>
  <q-page padding></q-page>
</template>
