<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomers, useNameSearch, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody, SearchInput, WaitingLoad } from 'src/components';

const router = useRouter();

const documents = ref([]);

const { loading, getCustomers } = useCustomers();
const { searchQuery, matchingSearchQuery: customers } = useNameSearch(documents);
const { notify } = useTools();
const { attr } = useDefaults();

const handleEditCustomer = (customer) => {
  router.push({
    name: 'customer-form',
    params: { id: customer.id }
  });
};

const handleGetCustomers = async () => {
  try {
    documents.value = await getCustomers('id, name, active');
  } catch (error) {
    notify.error('Erro ao obter os clientes.', error);
  }
};

onMounted(() => handleGetCustomers());
</script>

<template>
  <page padding>
    <page-header>
      <template #title>Clientes</template>
      <template #right>
        <q-btn
          v-bind="attr.btn.icon"
          color="primary"
          icon="sym_r_add"
          unelevated
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'customer-form' }"
        >
        </q-btn>
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <waiting-load :showing="loading.list.value" />

      <q-list v-if="!loading.list.value" separator class="q-mt-sm">
        <q-item
          v-for="(customer, index) in customers"
          :key="index"
          clickable
          class="q-px-xs"
          @click="handleEditCustomer(customer)"
        >
          <q-item-section>
            <q-item-label :class="{ 'text-negative text-strike': !customer.active }">
              {{ customer.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
