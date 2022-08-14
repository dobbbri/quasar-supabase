<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useProducts, useServices, useNameSearch, useTools } from 'src/composables';

const router = useRouter();

const documents = ref([]);

const { temp } = useOrders();
const { loading, getProducts } = useProducts();
const { getServices } = useServices();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify, fmt } = useTools();

const title = ref('');
const itemList = ref([]);

const handleBackTo = () => {
  router.push({ name: 'order-item-list' });
};

const handleAddToProductList = () => {
  products.value.forEach((product) => {
    if (product.selected) {
      product.amount = 1;
      if (temp.value.active == 'service') {
        temp.value.service.list.unshift(product);
        temp.value.service.total += product.unit_price;
      } else {
        temp.value.product.list.unshift(product);
        temp.value.product.total += product.unit_price;
      }
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

const handleGetServices = async () => {
  try {
    documents.value = await getServices('id, name, code_bar, unit_price, measure_unit, selected');
  } catch (error) {
    notify.error('Erro ao obter os servicos.', error);
  }
};

onMounted(async () => {
  if (temp.value.active == 'service') {
    title.value = 'servicos';
    itemList.value = temp.value.service.list;
    await handleGetServices();
  } else {
    title.value = 'produtos';
    itemList.value = temp.value.product.list;
    await handleGetProducts();
  }
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back @click="handleBackTo" />
      </template>
      <template #title>Selecionar {{ title }}</template>
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
