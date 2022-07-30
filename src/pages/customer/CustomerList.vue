<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useCustomers, useNameSearch, useTools, useActive } from 'src/composables';
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

const { order } = useOrders();
const { active, fromTabMenu } = useActive();
const { loading, clearCustomer, getCustomers } = useCustomers();
const { searchQuery, matchingSearchQuery: customers } = useNameSearch(documents);
const { notify } = useTools();

const handleBackTo = () => {
  if (active.value.from1Form) {
    router.push({ name: active.value.from1Form });
  } else {
    router.push({ name: 'main-menu' });
  }
};

const handleAddCustomer = () => {
  clearCustomer();
  router.push({ name: 'customer-form' });
};

const handleViewCustomer = (selected) => {
  clearCustomer();
  if (active.value.from1Form) {
    order.value.customer_id = selected.id;
    order.value.customerName = selected.name;
    router.push({ name: active.value.from1Form });
  } else {
    router.push({ name: 'customer-view', params: { id: selected.id } });
  }
};

const handleGetCustomers = async () => {
  try {
    documents.value = await getCustomers('id, name');
  } catch (error) {
    notify.error('Erro ao obter os clientes.', error);
  }
};

onMounted(async () => {
  await handleGetCustomers();
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!fromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Clientes</template>
      <template #right>
        <btn-add @click="handleAddCustomer()" />
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <waiting-load :showing="loading.value" />

      <q-list v-if="!loading.value" separator class="q-mt-sm">
        <q-item
          v-for="(customer, index) in customers"
          :key="index"
          clickable
          class="q-px-xs"
          @click="handleViewCustomer(customer)"
        >
          <q-item-section>
            <q-item-label>
              {{ customer.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
