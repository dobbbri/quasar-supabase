<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  tooltip: { type: String, default: null }
});
</script>

<template>
  <q-btn v-bind="attr.btn.icon">
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>
