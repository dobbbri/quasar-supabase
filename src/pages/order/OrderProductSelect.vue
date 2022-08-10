<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useProducts, useNameSearch, useTools } from 'src/composables';
import CheckBox from 'src/components/fw/form/CheckBox.vue';

const router = useRouter();

const documents = ref([]);

const { productList } = useOrders();
const { loading, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const handleBackTo = () => {
  router.push({ name: 'order-product-list' });
};

const handleSelectProduct = (product) => {
  productList.value.unshift({
    id: product.id,
    name: product.name,
    unit_price: product.unit_price,
    measure_unit: product.measure_unit,
    amount: 1
  });
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
        <btn-back @click="handleBackTo" />
      </template>
      <template #title>Selecionar Produtos</template>
      <template #right> </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <q-list v-if="!loading.value" separator style="margin: 0 -16px">
        <q-item
          v-for="(product, index) in products"
          :key="index"
          clickable
          @click="handleSelectProduct(product)"
        >
          <q-item-section avatar>
            <check-box />
          </q-item-section>
          <q-item-section>
            <q-item-label> {{ product.name }} </q-item-label>
            <q-item-label class="text-right">
              {{ fmt.currency(product.unit_price) }}/{{ product.measure_unit }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
