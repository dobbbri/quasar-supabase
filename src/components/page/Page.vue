<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-page padding v-bind="attr.page">
    <slot />
  </q-page>
</template>
