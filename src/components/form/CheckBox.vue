<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-checkbox v-bind="attr.input.basic" />
</template>
