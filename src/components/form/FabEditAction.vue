<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab-action v-bind="attr.fab.action" label="Alterar">
    <template #icon>
      <q-icon name="sym_o_edit" size="lg" />
    </template>
  </q-fab-action>
</template>
