<script setup>
import { defineProps } from 'vue';
import { Page, TextInput, MoneyInput } from 'src/components';
import { useOrders } from 'src/composables';

const { productList } = useOrders();

defineProps({
  index: { type: Number, required: true, default: 0 }
});
</script>

<template>
  <page v-if="index > 0">
    <text-input v-model="productList[index].name" label="Nome do produto" readonly />
    <text-input v-model="productList[index].measure_unit" label="Unidade de medida" readonly />
    <money-input v-model="productList[index].unit_price" label="Preço de venda" readonly />
    <money-input v-model="productList[index].amount" label="quantidade" />
  </page>
</template>
