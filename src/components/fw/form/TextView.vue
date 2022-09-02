<script setup>
import { defineProps } from 'vue'

defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  value2: { type: String, default: '' }
})
</script>

<template>
  <div class="text-view">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="value">
      <div v-if="value">{{ value }}</div>
      <div v-if="value2">{{ value2 }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.text-view {
  width: 100%;
  margin-bottom: 10px;

  .label {
    width: 100%;
    font-size: 17px;
    font-weight: 400;
    font-size: $input-font-size;
    color: $input-label-color;
  }

  .value {
    color: $input-text-color;
    font-size: $input-font-size;
    line-height: $body-line-height;
    font-weight: 500;
  }
}
</style>
