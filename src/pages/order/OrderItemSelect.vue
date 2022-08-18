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
    if (item.selected) {
      item.amount = 1;
      item.total = item.unit_price;
      if (temp.value.active == 'service') {
        temp.value.service.list.unshift(item);
      } else {
        temp.value.product.list.unshift(item);
      }
    }
  });
  router.push({ name: 'order-item-list' });
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
      <template #fixedTop>
        <div class="q-px-md">
          <search-input v-model="searchQuery" />
        </div>
      </template>
    </page-header>

    <page-body>
      <q-list v-if="!loading.value" separator style="margin: 0 -16px">
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
