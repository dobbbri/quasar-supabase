<script setup>
import { ref } from 'vue';
import { useSettings, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody } from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

const store = useSettingsStore();

const { loading, editSettings } = useSettings();
const { notify } = useTools();
const { attr } = useDefaults();

const measureUnits = ref([]);
measureUnits.value = store.measureUnits;

const handleSubmit = async () => {
  try {
    await editSettings({
      id: store.id,
      measure_units: JSON.stringify(measureUnits.value)
    });
    notify.success('Unidade de medida gravada.');
  } catch (error) {
    notify.error(`Erro ao alterar a unidade de medida.`, error);
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <q-btn
            v-bind="attr.btn.icon"
            icon="sym_o_arrow_back_ios_new"
            flat
            @click="$router.back()"
          />
        </template>
        <template #title>Unidade de medidas</template>
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

      <page-body>
        <q-banner v-bind="attr.banner">
          Como você mede os produtos/serviços para definir preço.
        </q-banner>

        <q-list separator style="margin-top: -10px">
          <q-item v-for="(measureUnit, index) in measureUnits" :key="index" class="q-pa-none">
            <q-item-section>
              <q-item-label v-if="measureUnit.group" class="text-h6 q-mt-lg">
                {{ measureUnit.group }}
              </q-item-label>
              <q-item-label class="text-body2" style="line-height: 12px !important">
                <q-checkbox
                  v-bind="attr.input.basic"
                  :id="index"
                  v-model="measureUnit.active"
                  :label="`${measureUnit.id}  -  ${measureUnit.name}`"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </page-body>
    </q-form>
  </page>
</template>
