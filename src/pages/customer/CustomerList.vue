<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrders, useCustomers, useNameSearch, useTools, useStore } from 'src/composables'

const router = useRouter()

const documents = ref([])

const { order } = useOrders()
const { state, isFromTabMenu } = useStore()
const { loading, clearCustomer, getCustomers } = useCustomers()
const { searchQuery, matchingSearchQuery: customers } = useNameSearch(documents)
const { notify } = useTools()

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 })
  } else {
    router.push({ name: 'main-menu' })
  }
}

const handleAddCustomer = () => {
  clearCustomer()
  router.push({ name: 'customer-form' })
}

const handleViewCustomer = (selected) => {
  clearCustomer()
  if (state.value.from.form1) {
    order.value.customer_id = selected.id
    order.value.customerName = selected.name
    router.push({ name: state.value.from.form1 })
  } else {
    router.push({ name: 'customer-view', params: { id: selected.id } })
  }
}

const handleGetCustomers = async () => {
  try {
    documents.value = await getCustomers('id, name')
  } catch (error) {
    notify.error('Erro ao obter os clientes.', error)
  }
}

onMounted(async () => {
  await handleGetCustomers()
})
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!isFromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Clientes</template>
      <template #right>
        <btn-header label="Adicionar" @click="handleAddCustomer()" />
      </template>
      <template #subheader>
        <search-input v-model="searchQuery" />
      </template>
    </page-header>

    <page-body>
      <waiting-load :showing="loading.value" />

      <q-list v-if="!loading.value" separator class="q-mt-sm -q-mx-md">
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
