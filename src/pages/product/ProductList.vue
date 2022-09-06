<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts, useNameSearch, useTools, useStore } from 'src/composables'

const router = useRouter()

const documents = ref([])

const { state, isFromTabMenu } = useStore()
const { loading, clearProduct, getProducts } = useProducts()
const { searchQuery, matchingSearchQuery: products } = useNameSearch(documents)
const { notify, fmt } = useTools()

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 })
  } else {
    router.push({ name: 'main-menu' })
  }
}

const handleAddProduct = () => {
  clearProduct()
  router.push({ name: 'product-form' })
}

const handleViewProduct = (product) => {
  clearProduct()
  router.push({ name: 'product-view', params: { id: product.id } })
}

const handleGetProducts = async () => {
  try {
    documents.value = await getProducts(
      'id, name, details, brand, code_bar, unit_price, measure_unit'
    )
  } catch (error) {
    notify.error('Erro ao obter os produtos.', error)
  }
}

onMounted(async () => {
  await handleGetProducts()
})
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!isFromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Produtos</template>
      <template #right>
        <btn-add @click="handleAddProduct()" />
      </template>
      <template #subheader>
        <search-input v-model="searchQuery" />
      </template>
    </page-header>

    <page-body>
      <q-list v-if="!loading" separator class="q-mt-sm -q-mx-md">
        <q-item
          v-for="(product, index) in products"
          :key="index"
          clickable
          @click="handleViewProduct(product)"
        >
          <q-item-section>
            <q-item-label> {{ product.name }} </q-item-label>
            <q-item-label v-if="product.brand" caption> marca: {{ product.brand }} </q-item-label>
            <q-item-label v-if="product.details" caption> {{ product.details }} </q-item-label>
            <q-item-label class="full-width row">
              <div class="col">
                {{ product.code_bar }}
              </div>
              <div class="col text-right">
                {{ fmt.currency(product.unit_price) }}/{{ product.measure_unit }}
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
