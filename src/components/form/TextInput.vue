<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-input
    type="text"
    v-bind="attr.input.basic"
  />
</template>
