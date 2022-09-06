<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomers, useTools } from 'src/composables'

const route = useRoute()

const { loading, customer, address, getCustomer, getAddress } = useCustomers()
const { notify } = useTools()

const handleGetCustomer = async () => {
  try {
    let data = await getCustomer(route.params.id)
    customer.value = data[0]
    data = await getAddress(customer.value.id)
    if (data) address.value = data[0]
  } catch (error) {
    notify.error('Erro a o obter o cliente.', error)
  }
}

const addressFormated = computed(() => {
  if (address.value && address.value.street > 0) {
    return [
      `${address.value.street}, ${address.value.number}, ${address.value.complement},`,
      `${address.value.neighborhood}, ${address.value.city} - ${address.value.state}, CEP ${address.value.zip_code}`
    ]
  }
  return null
})

onMounted(async () => {
  await handleGetCustomer()
})
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back label="Clientes" :to="{ name: 'customer-list' }" />
        </template>
        <template #title>Cliente</template>
        <template #right>
          <btn-header label="Alterar" :loading="loading" :to="{ name: 'customer-form' }" />
        </template>
      </page-header>

      <page-body>
        <expansion-item default-opened label="Informação do Cliente" style="margin-top: -20px">
          <text-view :value="customer.name" label="Nome do Cliente" />

          <text-view v-if="customer.email" :value="customer.email" label="Email" />

          <text-view
            v-if="customer.phone_1 || customer.phone_2"
            :value="customer.phone_1"
            :value2="customer.phone_2"
            label="Telefone"
          />

          <text-view
            v-if="address && address.street > 0"
            :value="addressFormated[0]"
            :value2="addressFormated[1]"
            label="Endereço"
          />

          <text-view
            v-if="customer.document_number"
            :value="customer.document_number"
            :label="customer.document_number > 11 ? 'CNPJ' : 'CPF'"
          />

          <text-view v-if="customer.notes" :value="customer.notes" label="Anotações" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
