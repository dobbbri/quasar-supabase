<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useServices, useNameSearch, useTools } from 'src/composables';
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

const { loading, getServices } = useServices();
const { searchQuery, matchingSearchQuery: services } = useNameSearch(documents);
const { notify, fmt } = useTools();

const handleViewService = (service) => {
  router.push({ name: 'service-view', params: { id: service.id } });
};

const handleGetServices = async () => {
  try {
    documents.value = await getServices('id, name, measure_unit, price, active');
  } catch (error) {
    notify.error('Erro ao obter os serviços.', error);
  }
};

onMounted(async () => {
  await handleGetServices();
});
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back :to="{ name: 'index' }" />
      </template>
      <template #title>Serviços</template>
      <template #right>
        <btn-add :loading="loading.value" :to="{ name: 'service-form' }" />
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <waiting-load :showing="loading.value" />

      <q-list v-if="!loading.value" separator>
        <q-item
          v-for="(service, index) in services"
          :key="index"
          clickable
          class="q-px-xs"
          @click="handleViewService(service)"
        >
          <q-item-section>
            <q-item-label class="row">
              <span class="col" :class="{ 'text-negative text-strike': !service.active }">
                {{ service.name }}
              </span>
              <span
                v-if="!service.active"
                class="col-4 text-right negative"
                style="margin-left: 5px"
              >
                *** desativado ***
              </span>
            </q-item-label>
            <q-item-label class="row" style="margin-top: 4px">
              <span class="col">
                {{ service.brand }}
              </span>
              <span class="col text-right">
                {{ fmt.currency(service.price) }} / {{ service.measure_unit }}
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
