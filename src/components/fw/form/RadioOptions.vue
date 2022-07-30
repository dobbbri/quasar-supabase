<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-option-group v-bind="attr.input.basic" class="q-mt-md" inline />
</template>
