<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts, useNameSearch, useTools } from 'src/composables';
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

const { loading, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const handleViewProduct = (product) => {
  router.push({ name: 'product-view', params: { id: product.id } });
};

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts(
      'id, name, has_stock_control, stock_amount, measure_unit, price_to_sell, active'
    );
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
        <btn-back :to="{ name: 'index' }" />
      </template>
      <template #title>Produtos</template>
      <template #right>
        <btn-add :loading="loading.value" :to="{ name: 'product-form' }" />
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
          class="q-px-xs"
          @click="handleViewProduct(product)"
        >
          <q-item-section>
            <q-item-label class="row">
              <span class="col" :class="{ 'text-negative text-strike': !product.active }">
                {{ product.name }}
              </span>
              <span v-if="product.has_stock_control" class="col-2 text-right">
                <span>
                  {{ product.stock_amount }}
                </span>
                <span style="margin-left: 5px">
                  {{ product.measure_unit }}
                </span>
              </span>
            </q-item-label>
            <q-item-label class="row" style="margin-top: 4px">
              <span class="col">
                {{ product.brand }}
              </span>
              <span class="col text-right">
                {{ fmt.currency(product.price_to_sell) }}
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
