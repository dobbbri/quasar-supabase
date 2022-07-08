<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  loading: Boolean
});
</script>

<template>
  <q-btn
    v-bind="attr.btn.icon"
    icon="sym_o_add"
    class="bg-info q-pa-sm"
    text-color="white"
    flat
    :loading="loading"
    :disable="loading"
  >
    <q-tooltip>Adicionar</q-tooltip>
  </q-btn>
</template>
