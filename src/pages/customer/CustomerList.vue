<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomers, useNameSearch, useTools } from 'src/composables';
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

const { loading, getCustomers } = useCustomers();
const { searchQuery, matchingSearchQuery: customers } = useNameSearch(documents);
const { notify } = useTools();

const handleViewCustomer = (customer) => {
  router.push({ name: 'customer-view', params: { id: customer.id } });
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
        <btn-back :to="{ name: 'index' }" />
      </template>
      <template #title>Clientes</template>
      <template #right>
        <btn-add :loading="loading.value" :to="{ name: 'customer-form' }" />
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
