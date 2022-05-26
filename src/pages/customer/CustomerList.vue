<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import {
  useCustomers,
  useNameSearch,
  useTools,
  useDefaults
} from 'src/composables';
import { PageHeader } from 'src/components';

const router = useRouter();
const $q = useQuasar();

const documents = ref([]);

const { loading, getCustomers } = useCustomers();
const { searchQuery, matchingSearchQuery: customers } =
  useNameSearch(documents);
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
  <q-page padding>
    <page-header>
      <template #title>Clientes</template>
      <template #right>
        <q-btn
          v-if="!$q.platform.is.mobile"
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

    <q-input
      v-model="searchQuery"
      v-bind="attr.input.search"
      placeholder="Digite para pesquisar"
    >
      <template #prepend>
        <q-icon name="sym_r_search" />
      </template>
    </q-input>

    <q-inner-loading
      :showing="loading.list.value"
      color="primary"
      label="obtendo registros..."
    />

    <q-list
      v-if="!loading.list.value"
      separator
    >
      <q-item
        v-for="(customer, index) in customers"
        :key="index"
        clickable
        class="q-px-xs"
        @click="handleEditCustomer(customer)"
      >
        <q-item-section>
          <q-item-label
            :class="{ 'text-negative text-strike': !customer.active }"
          >
            {{ customer.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="$q.platform.is.mobile"
        v-bind="attr.btn.icon"
        icon="sym_r_add"
        fab
        :loading="loading.add.value"
        :disable="loading.disable.value"
        :to="{ name: 'customer-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
