<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useProducts, useNameSearch, useTools } from 'src/composables';

const router = useRouter();

const documents = ref([]);
const productsSelectd = ref([]);

const { productList } = useOrders();
const { loading, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const title = ref('');

const handleBackTo = () => {
  router.push({ name: 'order-item-list' });
};

const handleAddToProductList = () => {
  products.value.forEach((product) => {
    if (product.selected) {
      product.amount = 1;
      productList.value.unshift(product);
    }
  });
  handleBackTo();
};

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts('id, name, code_bar, unit_price, measure_unit, selected');
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error);
  }
};

watchEffect(() => {
  title.value = `${productsSelectd.value.length} Selecionados`;
});

onMounted(async () => {
  title.value = 'Selecionar Produtos';
  productsSelectd.value = [];
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
      <template #right>
        <btn color="info" label="Continuar" @click="handleAddToProductList()" />
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <q-list v-if="!loading.value" separator style="margin: 0 -16px">
        <q-item v-for="(product, index) in products" :key="index">
          <q-item-section>
            <q-item-label> {{ product.name }} </q-item-label>
            <q-item-label class="full-width row">
              <div class="col">
                {{ product.code_bar }}
              </div>
              <div class="col q-pl-sm">
                {{ fmt.currency(product.unit_price) }}/{{ product.measure_unit }}
              </div>
            </q-item-label>
          </q-item-section>
          <check-box v-model="product.selected" />
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
