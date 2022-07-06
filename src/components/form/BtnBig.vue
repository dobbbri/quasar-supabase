<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

const props = defineProps({
  item: { type: Object, default: () => {} }
});
</script>

<template>
  <q-btn v-bind="attr.btn.big" style="padding: 13px 10px">
    <div class="row" style="width: 100%">
      <div class="col-2 q-ma-auto">
        <q-icon :name="props.item.icon" :text-color="props.item.iconColor" size="md" />
      </div>
      <div class="col-10 text-left q-my-auto q-pl-xs" style="line-height: 16px; font-weight: 500">
        {{ props.item.title }}
      </div>
    </div>
  </q-btn>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>
