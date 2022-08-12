<script setup>
import { toRef, defineProps, computed, defineEmits } from 'vue';
import { useTools } from 'src/composables';

const { fmt } = useTools();

const props = defineProps({
  product: { type: Object, required: true, default: () => {} }
});

defineEmits(['remove']);

const product = toRef(props, 'product');

const total = computed(() => {
  return product.value.unit_price * product.value.amount;
});
</script>

<template>
  <div v-if="product" class="q-pb-xs q-pt-sm q-pr-md shadow-2">
    <text-view :value="product.name" label="nome do produto" class="q-pl-md" />
    <div class="row">
      <div class="col q-pl-md">
        <text-view
          :value="fmt.currency(product.unit_price) + '/' + product.measure_unit"
          label="preço de venda"
        />
      </div>
      <div class="col text-right">
        <money-input v-model="product.amount" label="quantidade" />
      </div>
    </div>
    <div class="row">
      <div class="col q-pl-md">
        <btn-icon
          icon="sym_o_delete"
          class="bg-negative"
          tooltip="Excluir"
          index="-1"
          @click="$emit('remove')"
        />
      </div>
      <div class="col ar">
        <text-view :value="fmt.currency(total)" label="valor" class="text-weight-bold" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ar {
  padding-left: 27px;
  .text-view {
    .label,
    .value {
      font-weight: bold;
    }
  }
}
</style>
