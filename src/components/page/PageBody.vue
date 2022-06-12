<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <div v-bind="attr.pageBodySpacing">
    <slot />
  </div>
</template>
