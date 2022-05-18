<script setup>
import { ref } from "vue";
import { useSettings, useTools, useDefaults } from "src/composables";
import { PageHeader, PageFooter } from "src/components";
import { useSettingsStore } from "src/stores/settingsStore";

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
      measure_units: JSON.stringify(measureUnits.value),
    });
    notify.success("Unidade de medida gravada.");
  } catch (error) {
    notify.error(`Erro ao alterar a unidade de medida.`, error);
  }
};
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Unidade de medidas</template>
    </page-header>

    <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
      <q-banner v-bind="attr.banner">
        Como você mede os produtos/serviços para definir preço.
      </q-banner>

      <q-list separator style="margin-top: -6px">
        <q-item
          v-for="(measureUnit, index) in measureUnits"
          :key="index"
          class="q-pa-none"
        >
          <q-item-section>
            <q-item-label v-if="measureUnit.group" class="text-h6 q-mt-lg">
              {{ measureUnit.group }}
            </q-item-label>
            <q-item-label
              class="text-body2"
              style="line-height: 12px !important"
            >
              <q-checkbox
                v-bind="attr.input.basic"
                :id="index"
                v-model="measureUnit.active"
                :label="`${measureUnit.abbr} - ${measureUnit.name}`"
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
