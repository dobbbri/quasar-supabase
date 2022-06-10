<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  label: { type: String, required: true }
});
</script>

<template>
  <q-expansion-item
    v-bind="attr.expansion"
    :label="label"
  >
    <div v-bind="attr.lineSpacing">
      <slot />
    </div>
  </q-expansion-item>
</template>
