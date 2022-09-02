<script setup>
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()
</script>

<template>
  <q-btn
    v-bind="attr.btn.header"
    rounded
    flat
    icon="sym_o_arrow_back_ios_new"
    class="q-pl-xs q-pr-sm"
  />
</template>
