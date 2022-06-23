<script setup>
import { ref } from 'vue';
import { useSettings, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody } from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

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
      payment_methods: JSON.stringify(paymentMethods.value)
    });
    notify.success('Forma de pagamento gravado.');
  } catch (error) {
    notify.error(`Erro ao alterar a forma de pagamento.`, error);
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
        <template #title>Formas de Pagamento</template>
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
        <q-banner v-bind="attr.banner"> Escolha a forma que o cliente pode pagar </q-banner>

        <q-list separator>
          <q-item v-for="(paymentMethod, index) in paymentMethods" :key="index" class="q-pa-none">
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
      </page-body>
    </q-form>
  </page>
</template>
