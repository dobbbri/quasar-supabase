<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  label: { type: String, required: true },
  group: { type: String, default: '1-group-1' }
});
</script>

<template>
  <q-expansion-item :group="group" v-bind="attr.expansion" :label="label">
    <div v-bind="attr.lineSpacing">
      <slot />
    </div>
  </q-expansion-item>
</template>
