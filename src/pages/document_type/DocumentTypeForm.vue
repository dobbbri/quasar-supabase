<script setup>
import { ref } from 'vue'
import { useSettings, useTools, useDefaults } from 'src/composables'
import { PageHeader, PageFooter } from 'src/components'
import { useSettingsStore } from 'src/stores/settingsStore'

const store = useSettingsStore()

const { loading, editSettings } = useSettings()
const { notify } = useTools()
const { attr } = useDefaults()

const documentTypes = ref([])
documentTypes.value = store.documentTypes

const handleSubmit = async () => {
  try {
    await editSettings({
      id: store.id,
      document_types: JSON.stringify(documentTypes.value)
    })
    notify.success('Tipo de documento alterada')
  } catch (error) {
    notify.error(`Erro ao alterar a tipo de documento.`, error)
  }
}
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Tipos de Documentos</template>
    </page-header>

    <q-form
      class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md"
      @submit.prevent="handleSubmit"
    >
      <q-list
        separator
        class="q-mt-sm"
      >
        <q-item
          v-for="(documentType, index) in documentTypes"
          :key="index"
          class="q-py-none"
        >
          <q-item-section>
            <q-item-label class="text-subtitle2">
              <q-checkbox
                :id="index"
                v-model="documentType.inactive"
                :label="documentType.name"
                class="checkbox-fix"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <page-footer>
        <q-btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          outline
          class="col-4 bg-white"
          :disable="loading.disable.value"
          :to="{ name: 'index' }"
        />

        <q-space />

        <q-btn
          v-bind="attr.btn.basic"
          label="Gravar"
          unelevated
          class="col-4"
          :loading="loading.edit.value"
          :disable="loading.disable.value"
          type="submit"
        />
      </page-footer>
    </q-form>
  </q-page>
</template>
