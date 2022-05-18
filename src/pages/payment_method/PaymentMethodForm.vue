<script setup>
import { ref } from "vue";
import { useSettings, useTools, useDefaults } from "src/composables";
import { PageHeader, PageFooter } from "src/components";
import { useSettingsStore } from "src/stores/settingsStore";

const store = useSettingsStore();

const { loading, editSettings } = useSettings();
const { notify } = useTools();
const { attr } = useDefaults();

const paymentMethods = ref([]);
paymentMethods.value = store.paymentMethods;

const handleSubmit = async () => {
  try {
    await editSettings({
      id: store.id,
      payment_methods: JSON.stringify(paymentMethods.value),
    });
    notify.success("Forma de pagamento gravado.");
  } catch (error) {
    notify.error(`Erro ao alterar a forma de pagamento.`, error);
  }
};
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Formas de Pagamento</template>
    </page-header>

    <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
      <q-banner v-bind="attr.banner"
        >Escolha a forma que o cliente pode pagar</q-banner
      >

      <q-list separator>
        <q-item
          v-for="(paymentMethod, index) in paymentMethods"
          :key="index"
          class="q-py-none"
        >
          <q-item-section>
            <q-item-label class="text-subtitle2">
              <q-checkbox
                v-bind="attr.input.basic"
                :id="index"
                v-model="paymentMethod.active"
                :label="paymentMethod.name"
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
