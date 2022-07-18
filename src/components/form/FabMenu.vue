<script setup>
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
</script>

<template>
  <q-fab
    v-bind="attr.fab.menu"
    icon="sym_o_more_vert"
    size="32px"
    padding="2px"
    class="bg-blue-grey-12"
    text-color="dark"
    flat
  >
    <slot />
  </q-fab>
</template>

<style lang="scss" scoped>
.q-fab__label--external {
  font-size: $tooltip-fontsize !important;
}
/* .q-btn--fab .q-icon, */
/* .q-btn--fab-mini .q-icon { */
/*   font-size: 28px; */
/* } */
</style>
