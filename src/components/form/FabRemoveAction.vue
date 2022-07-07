<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  loading: Boolean
});
</script>

<template>
  <q-fab-action v-bind="attr.fab.action" :loading="loading" :disable="loading" label="Remover">
    <template #icon>
      <q-icon name="sym_o_delete" size="md" />
    </template>
  </q-fab-action>
</template>
