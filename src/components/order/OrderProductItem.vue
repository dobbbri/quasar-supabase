<script setup>
import { toRef, defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const product = toRef(props, 'product');
</script>

<template>
  <div v-if="product" class="q-mt-sm">
    <text-input v-model="product.name" label="Nome do produto" readonly />
    <text-input v-model="product.measure_unit" label="Unidade de medida" readonly />
    <div class="row q-gutter-x-md">
      <div class="col">
        <money-input v-model="product.unit_price" label="Preço de venda" readonly />
      </div>
      <div class="col">
        <money-input v-model="product.amount" label="quantidade" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
  border-color: $blue-grey-2;
}
</style>
