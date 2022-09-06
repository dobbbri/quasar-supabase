<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrders, useServices, useNameSearch, useTools, useStore } from 'src/composables'

const router = useRouter()

const documents = ref([])

const { orderService, serviceList, clearOrderService } = useOrders()
const { state, isFromTabMenu } = useStore()
const { loading, clearService, getServices } = useServices()
const { searchQuery, matchingSearchQuery: services } = useNameSearch(documents)
const { notify, fmt } = useTools()

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 })
  } else {
    router.push({ name: 'main-menu' })
  }
}

const handleAddService = () => {
  clearService()
  router.push({ name: 'service-form' })
}

const handleViewService = (service) => {
  if (state.value.from.form1) {
    clearOrderService()
    orderService.value.id = service.id
    orderService.value.name = service.name
    orderService.value.price = service.price
    orderService.value.measure_unit = service.measure_unit
    orderService.value.amount = service.amount
    serviceList.value.push(orderService)
    router.push({ name: state.value.from.form1 })
  } else {
    clearService()
    router.push({ name: 'service-view', params: { id: service.id } })
  }
}

const handleGetServices = async () => {
  try {
    documents.value = await getServices('id, name, measure_unit, unit_price, details')
  } catch (error) {
    notify.error('Erro ao obter os serviços.', error)
  }
}

onMounted(async () => {
  await handleGetServices()
})
</script>

<template>
  <page>
    <page-header>
      <template #left>
        <btn-back v-if="!isFromTabMenu" @click="handleBackTo" />
      </template>
      <template #title>Serviços</template>
      <template #right>
        <btn-add @click="handleAddService()" />
      </template>
      <template #subheader>
        <search-input v-model="searchQuery" />
      </template>
    </page-header>

    <page-body>
      <waiting-load :showing="loading" />

      <q-list v-if="!loading" separator class="q-mt-sm -q-mx-md">
        <q-item
          v-for="(service, index) in services"
          :key="index"
          clickable
          @click="handleViewService(service)"
        >
          <q-item-section>
            <q-item-label> {{ service.name }} </q-item-label>
            <q-item-label v-if="service.details" caption> {{ service.details }} </q-item-label>
            <q-item-label class="text-right">
              {{ fmt.currency(service.unit_price) }}/{{ service.measure_unit }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page>
</template>
