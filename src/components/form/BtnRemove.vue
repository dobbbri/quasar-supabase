<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn v-bind="attr.btn.icon" icon="sym_o_delete" color="negative" unelevated>
    <q-tooltip>Excluir</q-tooltip>
  </q-btn>
</template>
