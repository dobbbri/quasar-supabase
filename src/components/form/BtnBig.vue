<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

const props = defineProps({
  item: { type: Object, default: () => {} },
  vAligned: { type: Boolean, default: true }
});
</script>

<template>
  <q-btn v-bind="attr.btn.big" align="left" class="q-pa-sm">
    <div class="row justify-start items-center">
      <q-icon
        :name="`sym_o_${props.item.icon}`"
        :class="`bg-${props.item.color}`"
        class="q-pa-xs text-white"
        style="border-radius: 4px; border: 2px solid white"
        size="md"
      />
      <div v-if="!vAligned" class="q-pl-sm text-weight-medium">
        {{ props.item.title }}
      </div>
    </div>
    <div
      v-if="vAligned"
      class="text-left q-mt-xs self-start text-weight-medium"
      style="line-height: 15px; height: 30px; font-size: 14px"
    >
      {{ props.item.title }}
    </div>
  </q-btn>
</template>

<style lang="scss" scoped>
.btn-padding {
  padding: 13px 10px;
}
.btn-text {
  width: 60px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>
