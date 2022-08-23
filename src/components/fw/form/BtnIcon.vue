<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  loading: Boolean,
  tooltip: { type: String, default: '' }
});
</script>

<template>
  <q-btn
    v-bind="attr.btn.icon"
    size="18px"
    padding="6px"
    class="q-pa-sm justify-center"
    text-color="info"
    flat
    :loading="loading"
    :disable="loading"
  >
    <q-tooltip>{{ tooltip }}</q-tooltip>
  </q-btn>
</template>
