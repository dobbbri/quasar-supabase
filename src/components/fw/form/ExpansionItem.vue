<script setup>
import { ref, defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

const opened = ref(true);

defineProps({
  label: { type: String, required: true },
  group: { type: String, default: '1-group-1' },
  fake: { type: Boolean, default: false }
});
</script>

<template>
  <q-expansion-item
    v-if="fake"
    v-model="opened"
    expand-icon-toggle
    expand-icon-class="hide"
    group="groupxxxxx"
    v-bind="attr.expansion"
    :label="label"
    class=""
  >
    <div v-bind="attr.lineSpacing" class="q-px-md q-pb-xs">
      <slot />
    </div>
  </q-expansion-item>
  <q-expansion-item v-else :group="group" v-bind="attr.expansion" :label="label">
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
  // background: $blue-grey-1;
  color: $dark !important;
  border-radius: 50%;
}
</style>
