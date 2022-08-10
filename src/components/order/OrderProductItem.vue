<script setup>
import { toRef, defineProps, computed } from 'vue';
import { useTools } from 'src/composables';

const { fmt } = useTools();

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const product = toRef(props, 'product');

const total = computed(() => {
  return product.value.unit_price * product.value.amount;
});
</script>

<template>
  <div v-if="product" class="q-pa-md q-pt-none shadow-2">
    <text-view :value="product.name" label="nome do produto" class="q-pl-md" />
    <div class="row q-gutter-x-md">
      <div class="col q-pl-md">
        <text-view
          :value="fmt.currency(product.unit_price) + '/' + product.measure_unit"
          label="preço de venda"
        />
      </div>
      <div class="col text-right ar">
        <btn-icon
          icon="sym_o_delete"
          class="bg-negative"
          tooltip="Remover"
          :loading="loading"
          :disable="loading"
          index="-1"
        />
      </div>
    </div>
    <div class="row q-gutter-x-md ar">
      <div class="col">
        <money-input v-model="product.amount" label="quantidade" />
      </div>
      <div class="col">
        <text-view :value="fmt.currency(total)" label="valor total" class="text-weight-bold" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* .text-view { */
/*   margin-left: 14px; */
/* } */
.ar {
  margin-right: 14px;
  .text-view {
    .label {
      text-align: right;
    }
    .value {
      text-align: right;
    }
  }
}
</style>
