<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: { type: String, required: true },
  color: { type: String, default: 'primary' },
  tooltip: { type: String, default: '' }
})
</script>

<template>
  <q-checkbox
    :checked-icon="icon"
    :unchecked-icon="icon"
    :color="color"
    style="float: right"
    class="only-image"
  >
    <q-tooltip>{{ tooltip }}</q-tooltip>
  </q-checkbox>
</template>
