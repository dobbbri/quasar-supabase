<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

const props = defineProps({
  item: { type: Object, default: () => {} }
});
</script>

<template>
  <q-btn v-bind="attr.btn.big" class="btn-padding">
    <div class="row full-width">
      <div class="col-2 q-ma-auto">
        <q-icon :name="`sym_o_${props.item.icon}`" :color="props.item.color" size="md" />
      </div>
      <div class="col-10 text-left q-my-auto q-pl-md btn-text">
        {{ props.item.title }}
      </div>
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
