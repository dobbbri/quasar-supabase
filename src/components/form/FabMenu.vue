<script setup>
import { ref } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
const fab = ref(false);
</script>

<template>
  <q-fab v-bind="attr.fab.menu" v-model="fab" padding="sm">
    <template #icon>
      <q-icon name="sym_o_more_vert" size="lg" />
    </template>
    <template #active-icon>
      <q-icon name="sym_o_close" size="lg" />
    </template>
    <slot />
  </q-fab>
</template>
