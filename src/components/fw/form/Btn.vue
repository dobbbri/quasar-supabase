<script setup>
import { defineProps } from 'vue'
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()

defineProps({
  loading: Boolean
})
</script>

<template>
  <q-btn v-bind="attr.btn.basic" :loading="loading" :disable="loading" />
</template>
