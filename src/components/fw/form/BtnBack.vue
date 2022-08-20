<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn v-bind="attr.btn.icon" icon="sym_o_arrow_back_ios_new" size="md" flat color="primary">
    <q-tooltip>Voltar</q-tooltip>
  </q-btn>
</template>
