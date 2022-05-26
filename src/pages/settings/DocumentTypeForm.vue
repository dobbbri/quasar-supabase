<script setup>
import { ref } from 'vue';
import { useSettings, useTools, useDefaults } from 'src/composables';
import { PageHeader } from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

const store = useSettingsStore();

const { loading, editSettings } = useSettings();
const { notify } = useTools();
const { attr } = useDefaults();

const documentTypes = ref([]);
documentTypes.value = store.documentTypes;

const handleSubmit = async () => {
  try {
    await editSettings({
      id: store.id,
      document_types: JSON.stringify(documentTypes.value)
    });
    notify.success('Tipo de documento gravado.');
  } catch (error) {
    notify.error(`Erro ao alterar a tipo de documento.`, error);
  }
};
</script>

<template>
  <q-form
    v-bind="attr.form"
    @submit.prevent="handleSubmit"
  >
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          icon="sym_r_arrow_back_ios_new"
          flat
          @click="$router.back()"
        />
      </template>
      <template #title>Tipos de Documentos</template>
      <template #right>
        <q-btn
          v-bind="attr.btn.basic"
          label="Gravar"
          :loading="loading.edit.value"
          :disable="loading.disable.value"
          type="submit"
        />
      </template>
    </page-header>

    <q-page
      padding
      class="q-gutter-y-sm"
    >
      <q-banner v-bind="attr.banner">
        Quais documentos que voce aceita para cadastar o cliente
      </q-banner>

      <q-list separator>
        <q-item
          v-for="(documentType, index) in documentTypes"
          :key="index"
          class="q-pa-none"
        >
          <q-item-section>
            <q-item-label class="text-subtitle2">
              <q-checkbox
                v-bind="attr.input.basic"
                :id="index"
                v-model="documentType.active"
                :label="documentType.name"
                class="checkbox-fix"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </q-form>
</template>
