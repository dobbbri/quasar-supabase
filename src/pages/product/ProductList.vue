<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useProducts, useNameSearch, useTools, useStore } from 'src/composables';

const router = useRouter();

const documents = ref([]);

const { orderProduct, productList, clearOrderProduct } = useOrders();
const { state, fromTabMenu } = useStore();
const { loading, clearProduct, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const handleBackTo = () => {
  if (state.value.from1Form) {
    router.push({ name: state.value.from1Form });
  } else {
    router.push({ name: 'main-menu' });
  }
};

const handleAddProduct = () => {
  clearProduct();
  router.push({ name: 'product-form' });
};

const handleViewProduct = (product) => {
  clearProduct();
  if (state.value.from1Form) {
    clearOrderProduct();
    orderProduct.value.id = product.id;
    orderProduct.value.name = product.name;
    orderProduct.value.price = product.price;
    orderProduct.value.measure_unit = product.measure_unit;
    orderProduct.value.amount = product.amount;
    productList.value.push(orderProduct);
    router.push({ name: state.value.from1Form });
  } else {
    router.push({ name: 'product-view', params: { id: product.id } });
  }
};

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts('id, name, details, brand, unit_price, measure_unit');
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error);
  }
};

onMounted(async () => {
  await handleGetProducts();
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!fromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Produtos</template>
      <template #right>
        <btn-add @click="handleAddProduct()" />
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <waiting-load :showing="loading.value" />

      <q-list v-if="!loading.value" separator>
        <q-item
          v-for="(product, index) in products"
          :key="index"
          clickable
          @click="handleViewProduct(product)"
        >
          <q-item-section>
            <q-item-label> {{ product.name }} </q-item-label>
            <q-item-label v-if="product.brand" caption> marca: {{ product.brand }} </q-item-label>
            <q-item-label v-if="product.details" caption> {{ product.details }} </q-item-label>
            <q-item-label class="text-right">
              {{ fmt.currency(product.unit_price) }}/{{ product.measure_unit }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
