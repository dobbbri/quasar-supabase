<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  label: { type: String, required: true },
  group: { type: String, default: '1-group-1' },
  fake: { type: Boolean, default: false }
});
</script>

<template>
  <div v-if="fake">
    <div v-bind="attr.expansion" class="text-primary title title-expansion">
      {{ label }}
    </div>
    <div v-bind="attr.lineSpacing" class="q-pb-xs">
      <slot />
    </div>
  </div>
  <q-expansion-item
    v-else
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

<style lang="scss">
.q-expansion-item__container > q-item {
  padding: 0 16px;
}

.q-item__section--side > .q-icon {
  font-size: 28px;
}

.q-expansion-item__toggle-icon {
  background: $blue-grey-1;
  color: $info;
  border-radius: 50%;
}
</style>
