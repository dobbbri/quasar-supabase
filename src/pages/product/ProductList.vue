<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts, useNameSearch, useTools, useActive } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  SearchInput,
  WaitingLoad,
  BtnBack,
  BtnAdd
} from 'src/components';

const router = useRouter();

const documents = ref([]);

const appName = 'product-list';

const { active } = useActive();

const { loading, clearProduct, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const handleBackTo = () => {
  if (active.value.formName !== appName.value) {
    router.push({ name: active.value.formName });
  } else {
    router.push({ name: 'main-menu' });
  }
};

const handleAddProduct = () => {
  clearProduct();
  router.push({ name: 'product-form' });
};

const handleViewProduct = (selected) => {
  clearProduct();
  router.push({ name: 'product-view', params: { id: selected.id } });
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
        <btn-back @click="handleBackTo()" />
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
