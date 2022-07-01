<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  loading: Boolean
});
</script>

<template>
  <q-fab-action v-bind="attr.fab.action" :loading="loading" :disable="loading" label="Alterar">
    <template #icon>
      <q-icon name="sym_o_edit" size="lg" />
    </template>
  </q-fab-action>
</template>
