<script setup>
import { defineProps } from 'vue'
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()

defineProps({
  loading: Boolean
})
</script>

<template>
  <q-btn v-bind="attr.btn.header" :loading="loading" :disable="loading" class="q-px-sm" />
</template>
