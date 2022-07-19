<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn v-bind="attr.btn.big" flat square padding="md" align="left" class="full-width my-btn">
    <q-icon size="sm" name="sym_o_arrow_forward_ios" class="q-ml-auto"></q-icon>
  </q-btn>
</template>
