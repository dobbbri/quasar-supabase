<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab-action
    v-bind="attr.fab.action"
    color="warning"
    text-color="dark"
    icon="sym_o_edit"
    label="Alterar"
  />
</template>
