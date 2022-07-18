<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  label: { type: String, required: true },
  group: { type: String, default: '1-group-1' }
});
</script>

<template>
  <q-expansion-item
    :group="group"
    v-bind="attr.expansion"
    :label="label"
    style="margin-left: -16px; margin-right: -16px"
  >
    <div v-bind="attr.lineSpacing" class="q-px-md q-pb-xs">
      <slot />
    </div>
  </q-expansion-item>
</template>

<style lang="scss" scoped>
.q-expansion-item__container > q-item {
  padding: 0 16px;
}

.q-item__section--side > .q-icon {
  font-size: 28px;
  background: $blue-grey-3;
  color: $primary;
  border-radius: 50%;
}

.body--dark {
  .q-item__section--side > .q-icon {
    background: $blue-grey-6;
    color: white;
  }
}
</style>
