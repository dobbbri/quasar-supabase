<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import {
  useProducts,
  useNameSearch,
  useTools,
  useDefaults
} from 'src/composables';
import { PageHeader } from 'src/components';

const router = useRouter();
const $q = useQuasar();

const documents = ref([]);

const { loading, getProducts } = useProducts();
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents);
const { notify } = useTools();
const { attr, fmt } = useDefaults();

const handleEditProduct = (product) => {
  router.push({
    name: 'product-form',
    params: { id: product.id }
  });
};

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts(
      'id, name, categories:category_id ( name, active ), stock_is_automatic, stock_amount, measure_unit, price_to_sell, brand, active'
    );
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error);
  }
};

onMounted(() => handleGetProducts());
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Produtos</template>
      <template #right>
        <q-btn
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          color="primary"
          icon="sym_r_add"
          unelevated
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'product-form' }"
        >
          <q-tooltip>Adicionar</q-tooltip>
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
        v-for="(product, index) in products"
        :key="index"
        clickable
        class="q-px-xs"
        @click="handleEditProduct(product)"
      >
        <q-item-section>
          <q-item-label class="row">
            <span
              class="col"
              :class="{ 'text-negative text-strike': !product.active }"
            >
              {{ product.name }}
            </span>
            <span class="col-2 text-right"  v-if="product.stock_is_automatic">
              <span>
                {{ product.stock_amount }}
              </span>
              <span style="margin-left: 5px">
                {{ product.measure_unit }}
              </span>
            </span>
          </q-item-label>
          <q-item-label
            class="row"
            style="margin-top: 4px"
          >
            <span class="col">
              <q-badge
                v-if="product.categories.active"
                outline
                class="text-dark"
                :label="product.categories.name.toString().toUpperCase()"
              />
              <q-badge
                v-else
                outline
                class="text-negative text-strike"
              >
                {{ product.categories.name.toString().toUpperCase() }}
              </q-badge>
            </span>
            <span class="col text-right">
              {{ fmt.currency(product.price_to_sell) }}
            </span>
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
        :to="{ name: 'product-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
