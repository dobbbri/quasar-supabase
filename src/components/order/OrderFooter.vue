<script setup>
import { ref } from 'vue';
import { useOrders, useTools } from 'src/composables';

const { order, temp } = useOrders();
const { fmt } = useTools();

const subtotal = ref(0);
const selected = ref(0);
const desc = ref('');

if (temp.value.active == 'product') {
  desc.value = 'Produtos';
  subtotal.value = temp.value.product.total;
  selected.value = temp.value.product.selected;
}
if (temp.value.active == 'service') {
  desc.value = 'Serviços';
  subtotal.value = temp.value.service.total;
  selected.value = temp.value.service.selected;
}
</script>

<template>
  <div v-if="$route.matched.some(({ name }) => name === 'order-form')">
    <q-toolbar class="text-weight-bold full-width">
      <q-toolbar-title> Total </q-toolbar-title>
      <div class="q-ml-auto">{{ fmt.currency(order.total) }}</div>
    </q-toolbar>
  </div>
  <div v-else-if="$route.matched.some(({ name }) => name === 'order-item-lits')">
    <q-toolbar class="text-weight-bold full-width">
      <q-toolbar-title>{{ desc }} subtotal </q-toolbar-title>
      <div class="q-ml-auto">{{ fmt.currency(subtotal) }}</div>
    </q-toolbar>
  </div>
  <div v-else-if="$route.matched.some(({ name }) => name === 'order-item-select')">
    <q-toolbar class="text-weight-bold full-width">
      <q-toolbar-title>selecionados </q-toolbar-title>
      <div class="q-ml-auto">{{ selected }}</div>
    </q-toolbar>
  </div>
</template>
