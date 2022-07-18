<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-btn
    v-bind="attr.btn.basic"
    icon-right="sym_o_arrow_forward_ios"
    flat
    square
    padding="md"
    align="left"
    class="full-width my-btn"
  />
</template>

<style lang="scss" scoped>
.q-icon {
  max-width: 16px;
  max-height: 16px;
}
</style>
