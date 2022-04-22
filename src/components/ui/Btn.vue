<script setup>
defineProps({
  tooltip: String
})
</script>

<template>
  <q-btn type="button">
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>
