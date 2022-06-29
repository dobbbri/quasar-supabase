<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersSettings, useTools } from 'src/composables';
import { useSettingsStore } from 'src/stores/settingsStore';
import { Page, PageHeader, WaitingLoad } from 'src/components';

const router = useRouter();
const store = useSettingsStore();

const { getSettings, addSettings } = useUsersSettings();
const { notify } = useTools();

const loading = ref(true);

const handleSettings = async () => {
  try {
    loading.value = true;
    let settings = await getSettings();
    if (settings) {
      store.setSettings(settings);
    } else {
      const { measureUnits, paymentMethods } = store.getDefaults();
      settings = await addSettings({
        measure_units: measureUnits,
        payment_methods: paymentMethods
      });
      store.setSettings(settings);
    }
    loading.value = false;
    router.push({ name: 'index' });
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
      <template #title>Aguarde</template>
      <template #left>&nbsp;</template>
    </page-header>

    <waiting-load :showing="loading" />
  </page>
</template>
