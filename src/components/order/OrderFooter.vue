<script setup>
import { defineProps } from 'vue';
import { useTools } from 'src/composables';

const { fmt } = useTools();

defineProps({
  label: { type: String, required: true, default: '' },
  total: { type: Number, default: 0 },
  amount: { type: Number, default: 0 }
});
</script>

<template>
  <q-toolbar class="text-weight-bold toolbar-height full-width">
    <q-toolbar-title class="text-subtitle1 text-weight-bold">
      {{ fmt.capitalize(label) }}
    </q-toolbar-title>
    <div v-if="total > 0" class="q-ml-auto">{{ fmt.currency(total) }}</div>
    <div v-if="amount > 0" class="q-ml-auto">{{ fmt.integer(amount) }}</div>
  </q-toolbar>
</template>
