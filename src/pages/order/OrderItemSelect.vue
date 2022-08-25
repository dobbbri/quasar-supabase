<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { OrderFooter } from 'src/components';
import { useOrders, useProducts, useServices, useNameSearch, useTools } from 'src/composables';

const router = useRouter();

const documents = ref([]);

const { temp } = useOrders();
const { loading, getProducts } = useProducts();
const { getServices } = useServices();
const { searchQuery, matchingSearchQuery: items } = useNameSearch(documents);
const { notify, fmt } = useTools();

const title = ref('');

const amount = computed(() => {
  return items.value.reduce((total, item) => (item.selected ? total + 1 : total), 0);
});

const handleBackTo = () => {
  items.value.forEach((item) => {
    const { selected, ...newItem } = item;
    if (selected) {
      newItem.amount = 1;
      newItem.total = newItem.unit_price;
      if (temp.value.active == 'service') {
        temp.value.service.list.unshift(newItem);
      } else {
        temp.value.product.list.unshift(newItem);
      }
    }
  });
  router.push({ name: 'order-item-list' });
};

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts();
  } catch (error) {
    notify.error('Erro ao obter produtos.', error);
  }
};

const handleGetServices = async () => {
  try {
    documents.value = await getServices();
  } catch (error) {
    notify.error('Erro ao obter serviços.', error);
  }
};

onMounted(async () => {
  if (temp.value.active == 'service') {
    title.value = 'serviços';
    await handleGetServices();
  } else {
    title.value = 'produtos';
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
      <template #subheader>
        <search-input v-model="searchQuery" />
      </template>
    </page-header>

    <page-body>
      <q-list v-if="!loading.value" separator class="q-mt-sm -q-mx-md">
        <q-item v-for="(item, index) in items" :key="index">
          <q-item-section>
            <q-item-label> {{ item.name }} </q-item-label>
            <q-item-label class="full-width row">
              <div class="col">
                {{ item.code_bar }}
              </div>
              <div class="col q-pl-sm">
                {{ fmt.currency(item.unit_price) }}/{{ item.measure_unit }}
              </div>
            </q-item-label>
          </q-item-section>
          <check-box v-model="item.selected" />
        </q-item>
      </q-list>
    </page-body>

    <page-footer class="text-grey-9 bg-grey-4">
      <order-footer :label="`${title} selecionados:`" :amount="amount" />
    </page-footer>
  </page>
</template>
