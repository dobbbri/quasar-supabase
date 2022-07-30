<script setup>
import { useRouter } from 'vue-router';
import { useUsersSettings, useTools, useDefaults, useData } from 'src/composables';

const router = useRouter();

const { settingId, paymentConditions, toJSON } = useData();
const { loading, editSettings } = useUsersSettings();
const { notify } = useTools();
const { attr } = useDefaults();

const handleSubmit = async () => {
  try {
    await editSettings({
      id: settingId.value,
      payment_conditions: toJSON(paymentConditions.value)
    });
    notify.success('Condições de pagamento gravado.');
    router.push({ name: 'settings-form' });
  } catch (error) {
    notify.error(`Erro ao alterar as condições de pagamento.`, error);
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'settings-form' }" />
        </template>
        <template #title>Alterar Condições</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <q-banner v-bind="attr.banner"> Escolha como o cliente pode te pagar </q-banner>

        <q-list separator>
          <q-item
            v-for="(paymentCondition, index) in paymentConditions"
            :key="index"
            class="q-pa-none"
          >
            <q-item-section>
              <q-item-label class="text-subtitle2">
                <q-checkbox
                  v-bind="attr.input.basic"
                  :id="index"
                  v-model="paymentCondition.active"
                  :label="paymentCondition.name"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </page-body>
    </q-form>
  </page>
</template>
