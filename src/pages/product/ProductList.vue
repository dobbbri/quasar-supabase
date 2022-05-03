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

const handleListProducts = async () => {
  try {
    documents.value = await getProducts(
      'id, name, categories:category_id ( name ), stock_is_automatic, stock_quantity, unit_sale_type, price_to_sell'
    )
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error)
  }
}

const handleEditProduct = (product) => {
  router.push({
    name: 'product-form',
    params: { id: product.id }
  })
}

onMounted(() => handleListProducts())
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
      type="search"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-inner-loading :showing="loading.list.value" color="primary" label="obtendo registros..." />

    <q-list v-if="!loading.list.value" bordered separator class="bg-white rounded-borders q-mt-sm">
      <q-item
        v-for="(product, index) in products"
        :key="index"
        clickable
        @click="handleEditProduct(product)"
      >
        <q-item-section>
          <q-item-label class="text-subtitle2 text-weight-medium">
            {{ product.name }}
          </q-item-label>
          <q-item-label class="row text-body2">
            <span class="col">
              <q-badge
                class="bg-blue-grey-2 text-body2 text-dark"
                :label="product.categories.name.toString().toUpperCase()"
              />
            </span>
            <span v-if="product.stock_is_automatic" class="col">
              {{ product.stock_quantity }} {{ product.unit_sale_type }}
            </span>
            <span class="col text-right">{{ fmt.currency(product.price_to_sell) }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
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
