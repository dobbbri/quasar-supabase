<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn v-bind="attr.btn.icon" icon="sym_o_edit" color="warning" unelevated>
    <q-tooltip>Alterar</q-tooltip>
  </q-btn>
</template>
