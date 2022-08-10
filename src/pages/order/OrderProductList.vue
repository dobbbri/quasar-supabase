<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { OrderProductItem } from 'src/components';
import { useOrders, useStore, useDefaults } from 'src/composables';

const router = useRouter();

const { productList } = useOrders();
const { state, isFromTabMenu } = useStore();
const { attr } = useDefaults();

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 });
  } else {
    router.push({ name: 'main-menu' });
  }
};

const handleAddProduct = () => {
  router.push({ name: 'product-form' });
};

onMounted(async () => {
  state.value.from.form2 = 'order-product-list';
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!isFromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Produtos</template>
      <template #right>
        <btn-add @click="handleAddProduct()" />
      </template>
    </page-header>

    <page-body>
      <q-btn
        v-bind="attr.btn.basic"
        label="Selecionar do catalogo"
        color="info"
        text-color="white"
        class="full-width"
        :to="{ name: 'order-product-select' }"
      />

      <!-- <waiting-load :showing="loading.value" /> -->

      <q-list style="margin: 0 -16px">
        <q-item v-for="(product, index) in productList" :key="index">
          <q-item-section>
            <order-product-item :product="product" />
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
