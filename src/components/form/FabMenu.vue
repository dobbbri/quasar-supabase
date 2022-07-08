<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab v-bind="attr.fab.menu" icon="sym_o_more_vert" padding="xs" text-color="white" flat>
    <slot />
  </q-fab>
</template>
