<script setup>
import { ref } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
const fab = ref(false);
</script>

<template>
  <q-fab v-bind="attr.fab.menu" v-model="fab" icon="sym_o_more_vert">
    <slot />
  </q-fab>
</template>
