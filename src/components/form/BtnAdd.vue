<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn v-bind="attr.btn.basic" color="info" label="Adicionar" />
</template>
