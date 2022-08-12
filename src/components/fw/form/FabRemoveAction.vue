<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  loading: Boolean
});
</script>

<template>
  <q-fab-action
    v-bind="attr.fab.action"
    :loading="loading"
    :disable="loading"
    class="bg-negative"
    label="Excluir"
    padding="8px"
    icon="sym_o_delete"
  />
</template>
