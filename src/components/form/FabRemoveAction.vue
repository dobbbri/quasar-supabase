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
    class="bg-red"
    :loading="loading"
    :disable="loading"
    label="Remover"
    icon="sym_o_delete"
  />
</template>
