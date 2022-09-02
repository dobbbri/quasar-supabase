<script setup>
import { defineProps } from 'vue'
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()

defineProps({
  loading: Boolean
})
</script>

<template>
  <q-btn
    v-bind="attr.btn.icon"
    icon="sym_o_add"
    size="18px"
    padding="6px"
    class="bg-info q-pa-sm justify-center"
    text-color="white"
    flat
    :loading="loading"
    :disable="loading"
  >
    <q-tooltip>Adicionar</q-tooltip>
  </q-btn>
</template>
