<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn
    v-bind="attr.btn.basic"
    text-color="dark"
    icon-right="sym_o_arrow_forward_ios"
    flat
    align="left"
    class="full-width my-btn"
  />
</template>
