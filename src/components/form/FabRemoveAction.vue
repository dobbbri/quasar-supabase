<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab-action v-bind="attr.fab.action" color="negative" icon="sym_o_delete" label="Remover" />
</template>
