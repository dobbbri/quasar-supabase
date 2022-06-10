<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import {
  useCategories,
  useNameSearch,
  useTools,
  useDefaults
} from 'src/composables';
import { PageHeader, SearchInput, WaitingLoad } from 'src/components';

const router = useRouter();
const $q = useQuasar();

const documents = ref([]);

const { loading, getCategories } = useCategories();
const { searchQuery, matchingSearchQuery: categories } =
  useNameSearch(documents);
const { notify } = useTools();
const { attr } = useDefaults();

const handleEditCategory = (category) => {
  router.push({
    name: 'category-form',
    params: { id: category.id }
  });
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
  <q-page padding>
    <page-header>
      <template #title>Categorias</template>
      <template #right>
        <q-btn
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          color="primary"
          icon="sym_r_add"
          unelevated
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'category-form' }"
        >
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <search-input v-model="searchQuery" />

    <waiting-load :showing="loading.list.value" />

    <q-list
      v-if="!loading.list.value"
      separator
      class="q-mt-sm"
    >
      <q-item
        v-for="(category, index) in categories"
        :key="index"
        clickable
        class="q-px-xs"
        @click="handleEditCategory(category)"
      >
        <q-item-section>
          <q-item-label
            :class="{ 'text-negative text-strike': !category.active }"
          >
            {{ category.name }}
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
        :to="{ name: 'category-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
