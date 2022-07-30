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
    icon="sym_o_edit"
    size="18px"
    padding="6px"
    class="bg-warning q-pa-sm justify-center q-ml-md"
    text-color="white"
    flat
    :loading="loading"
    :disable="loading"
  >
    <q-tooltip>Alterar</q-tooltip>
  </q-btn>
</template>
