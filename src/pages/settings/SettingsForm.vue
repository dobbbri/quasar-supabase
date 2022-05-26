<script setup>
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { PageHeader } from 'src/components';

const form = ref({
  dark_mode: false,
  stock_is_automatic: false
});
const $q = useQuasar();

watch(form.value.dark_mode, () => {
  $q.dark.set(form.value.dark_mode);
  $q.localStorage.set('darkMode', form.value.dark_mode);
});

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    form.value.dark_mode = true;
  }
});
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Endless</template>
    </page-header>
    <q-list class="rounded-borders">
      <q-item tag="label">
        <q-item-section>
          <q-item-label>Utilizar modo escuro</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            v-model="form.dark_mode"
            checked-icon="sym_r_dark_mode"
            unchecked-icon="sym_r_light_mode"
            val="picture"
          />
        </q-item-section>
      </q-item>
      <q-item tag="label">
        <q-item-section>
          <q-item-label>Utilizar estoque automático</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            v-model="form.stock_is_automatic"
            val="picture"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
