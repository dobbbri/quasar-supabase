<script setup>
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()
</script>

<template>
  <q-fab
    v-bind="attr.fab.menu"
    icon="more_vert"
    padding="xs"
    class="bg-white"
    text-color="dark"
    flat
  >
    <slot />
  </q-fab>
</template>

<style lang="scss">
.q-fab__label--external {
  font-size: $tooltip-fontsize !important;
}
.q-fab__icon-holder {
  min-width: 30px !important;
  min-height: 30px !important;
}
.q-btn--fab .q-icon,
.q-btn--fab-mini .q-icon {
  font-size: 30px !important;
}
</style>
