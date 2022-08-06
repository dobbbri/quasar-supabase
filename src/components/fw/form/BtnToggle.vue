<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  options: { type: Object, required: true }
});
</script>

<template>
  <q-btn-toggle
    v-bind="attr.btn.basic"
    class="q-mt-md"
    spread
    rounded
    toggle-color="primary"
    color="white"
    text-color="primary"
    :options="options"
  />
</template>
