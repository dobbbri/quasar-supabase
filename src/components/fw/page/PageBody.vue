<script setup>
import { useDefaults } from 'src/composables'
const { attr } = useDefaults()
</script>

<template>
  <div v-cloak v-bind="attr.lineSpacing">
    <slot />
  </div>
</template>
