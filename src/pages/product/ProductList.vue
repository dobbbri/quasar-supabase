<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useProducts, useNameSearch, useTools, useDefaults } from 'src/composables'
import { PageHeader } from 'src/components'

const router = useRouter()
const $q = useQuasar()

const documents = ref([])

const { loading, getProducts } = useProducts()
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents)
const { notify } = useTools()
const { attr, fmt } = useDefaults()

const handleEditProduct = (product) => {
  router.push({
    name: 'product-form',
    params: { id: product.id }
  })
}

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts(
      'id, name, categories:category_id ( name ), stock_is_automatic, stock_amount, measure_unit, price_to_sell'
    )
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error)
  }
}

onMounted(() => handleGetProducts())
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
          icon="add"
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
      autofocus
    >
      <template #prepend>
        <q-icon name="search" />
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
      class="q-mt-sm"
    >
      <q-item
        v-for="(product, index) in products"
        :key="index"
        clickable
        @click="handleEditProduct(product)"
      >
        <q-item-section>
          <div class="row">
            <span class="col">
              {{ product.name }}
            </span>
            <span class="col-2 text-right">
              {{ product.stock_amount }} {{ product.measure_unit_abbr }}
            </span>
          </div>
          <div class="row text-body2">
            <span class="col">
              <q-badge
                class="bg-blue-grey-2 text-dark text-weight-bold"
                :label="product.categories.name.toString().toUpperCase()"
              />
            </span>
            <span class="col text-right">
              {{ fmt.currency(product.price_to_sell) }}/{{ product.measure_unit }}
            </span>
          </div>
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
        icon="add"
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
