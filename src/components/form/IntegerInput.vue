<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    type="tel"
    mask="#"
    fill-mask="0"
    reverse-fill-mask
  />
</template>
