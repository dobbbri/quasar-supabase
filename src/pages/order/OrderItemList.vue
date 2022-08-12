<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { OrderAddItemAmount } from 'src/components';
import { useOrders, useStore, useDefaults, useTools } from 'src/composables';

const router = useRouter();

const { productList } = useOrders();
const { state, isFromTabMenu } = useStore();
const { attr } = useDefaults();
const { confirm, notify } = useTools();

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

const handleRemoveProduct = (index) => {
  try {
    const product = productList.value[index];
    confirm.delete(`o produto ${product.name}`).onOk(async () => {
      productList.value.splice(index, 1);
      notify.success('Produto excluido.');
    });
  } catch (error) {
    notify.error('Erro ao excluir o produto', error);
  }
};

onMounted(async () => {
  state.value.from.form2 = 'order-item-list';
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
        :to="{ name: 'order-item-select' }"
      />

      <!-- <waiting-load :showing="loading.value" /> -->

      <q-list style="margin: 0 -16px">
        <q-item v-for="(product, index) in productList" :key="index">
          <q-item-section>
            <order-add-item-amount :product="product" @remove="handleRemoveProduct(index)" />
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
