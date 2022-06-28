<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCategories, useNameSearch, useTools } from 'src/composables';
import { Page, PageHeader, PageBody, SearchInput, WaitingLoad, BtnAdd } from 'src/components';

const router = useRouter();

const documents = ref([]);

const { loading, getCategories } = useCategories();
const { searchQuery, matchingSearchQuery: categories } = useNameSearch(documents);
const { notify } = useTools();

const handleViewCategory = (category) => {
  router.push({ name: 'category-view', params: { id: category.id } });
};

const handleGetCategories = async () => {
  try {
    documents.value = await getCategories('id, name, active');
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error);
  }
};

onMounted(() => handleGetCategories());
</script>

<template>
  <page>
    <page-header>
      <template #title>Categorias</template>
      <template #right>
        <btn-add
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'category-form' }"
        />
      </template>
    </page-header>

    <page-body>
      <search-input v-model="searchQuery" />

      <waiting-load :showing="loading.list.value" />

      <q-list v-if="!loading.list.value" separator class="q-mt-sm">
        <q-item
          v-for="(category, index) in categories"
          :key="index"
          clickable
          class="q-px-xs"
          @click="handleViewCategory(category)"
        >
          <q-item-section>
            <q-item-label :class="{ 'text-negative text-strike': !category.active }">
              {{ category.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
