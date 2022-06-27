<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab-action v-bind="attr.fab.action" label="Remover">
    <template #icon>
      <q-icon name="sym_o_delete" size="lg" />
    </template>
  </q-fab-action>
</template>
