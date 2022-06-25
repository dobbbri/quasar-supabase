<script setup>
import { defineProps } from 'vue';

defineProps({
  label: { type: String, default: '' },
  value: { type: String, required: true }
});
</script>

<template>
  <div class="text-view">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<style lang="scss">
.text-view {
  height: 40px;
  border-radius: 8px;
  padding: 0 12px;
  width: 100%;

  .label {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    text-transform: lowercase;
    color: rgba(0, 0, 0, 0.3);
    background: white;
    z-index: 9;
    padding: 0 3px;
    margin: -13px 0 -9px -2px;
  }

  .value {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    padding: 7px 3px 9px 1px;
  }
}
</style>
