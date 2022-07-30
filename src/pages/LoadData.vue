<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersSettings, useTools, useData } from 'src/composables';

const router = useRouter();
const {
  settingId,
  measureUnits,
  orderStatuses,
  costCategories,
  paymentMethods,
  paymentConditions,
  toJS,
  toJSON
} = useData();

const { getSettings, addSettings } = useUsersSettings();
const { notify } = useTools();

const loading = ref(true);

const handleSettings = async () => {
  try {
    loading.value = true;
    let settings = await getSettings();
    if (settings) {
      settingId.value = settings[0].id;
      measureUnits.value = toJS(settings[0].measure_units);
      paymentMethods.value = toJS(settings[0].payment_methods);
      paymentConditions.value = toJS(settings[0].payment_conditions);
      orderStatuses.value = toJS(settings[0].order_status);
      costCategories.value = toJS(settings[0].cost_category);
    } else {
      settings = await addSettings({
        measure_units: toJSON(measureUnits.value),
        payment_methods: toJSON(paymentMethods.value),
        payment_conditions: toJSON(paymentConditions.value),
        order_status: toJSON(orderStatuses.value),
        cost_category: toJSON(costCategories.value)
      });
    }
    loading.value = false;
    router.push({ name: 'main-menu' });
  } catch (error) {
    loading.value = false;
    notify.error('Erro ao executar as rotinas iniciais.', error);
  }
};

onMounted(() => {
  handleSettings();
});
</script>

<template>
  <page>
    <page-header>
      <template #title>Endless</template>
    </page-header>

    <waiting-load :showing="loading.value" />
  </page>
</template>
