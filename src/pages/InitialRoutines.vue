<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettings, useTools } from 'src/composables'
import { useSettingsStore } from 'src/stores/settingsStore'

const router = useRouter()
const store = useSettingsStore()

const { getSettings, addSettings } = useSettings()
const { notify } = useTools()

const settings = ref([])

const handleSettings = async () => {
  try {
    if (store) settings.value = await getSettings()
    if (settings.value) {
      store.setSettings(settings.value)
    } else {
      const { documentTypes, measureUnits, paymentMethods } = store.getDefaults()
      settings.value = await addSettings({
        measure_units: measureUnits,
        document_types: documentTypes,
        payment_methods: paymentMethods
      })
      store.setSettings(settings.value)
    }
    console.log('store: ', store)
    router.push({ name: 'index' })
  } catch (error) {
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
