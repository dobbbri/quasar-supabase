<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomers, useTools, useStore } from 'src/composables'

const router = useRouter()

const { state, isFromTabMenu } = useStore()
const {
  loading,
  customer,
  address,
  addCustomerAddress,
  editCustomerAddress,
  removeCustomerAddress
} = useCustomers()
const { confirm, notify } = useTools()

const isEditMode = computed(() => (customer.value && customer.value.id ? true : false))
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'))

const handleBackTo = () => {
  if (isFromTabMenu.value) {
    router.push({ name: 'customer-list' })
  } else {
    router.push({ name: state.value.from.menu })
  }
}

const fillAddress = (data) => {
  address.value.street = data.street
  address.value.neighborhood = data.neighborhood
  address.value.state = data.state
  address.value.city = data.city
}

const handleRemoveCustomer = async () => {
  try {
    confirm.delete(`o cliente: ${customer.value.name}`).onOk(async () => {
      await removeCustomerAddress(customer.value, address.value)
      notify.success('Cliente excluido.')
      router.push({ name: 'customer-list' })
    })
  } catch (error) {
    notify.error('Erro ao excluir o cliente', error)
  }
}

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editCustomerAddress(customer.value, address.value)
    } else {
      await addCustomerAddress(customer.value, address.value)
    }
    notify.success(`Cliente ${isEditMode.value ? 'alterado' : 'adicionado'}.`)
    handleBackTo()
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o cliente.`, error)
  }
}
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-header label="Cancelar" @click="handleBackTo()" />
        </template>
        <template #title>Cliente</template>
        <template #right>
          <btn-header label="Gravar" :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="customer.name"
          label="Nome do cliente"
          :rules="[(val) => !!val]"
          error-message="O nome do cliente deve ser informado!"
        />

        <expansion-item :fake="true" label="Telefones e Email">
          <div class="line row q-gutter-x-md">
            <div class="col">
              <phone-input v-model="customer.phone_1" label="Celular" class="col-10" />
            </div>
            <div class="col">
              <phone-input v-model="customer.phone_2" label="Telefone" />
            </div>
          </div>
          <text-input v-model="customer.email" label="Email" />
        </expansion-item>

        <expansion-item label="Endereço">
          <cep-input
            v-model:cep="address.zip_code"
            label="CEP"
            hint="Preencha o CEP para buscar automática de endereço"
            @result="fillAddress"
          />

          <text-input v-model="address.street" label="Endereço" />

          <div class="line row q-gutter-x-md">
            <div class="col-4">
              <text-input v-model="address.number" label="Número" />
            </div>
            <div class="col">
              <text-input v-model="address.complement" label="Complemento" />
            </div>
          </div>

          <text-input v-model="address.neighborhood" label="Bairro" />

          <div class="line row q-gutter-x-md">
            <div class="col">
              <text-input v-model="address.city" label="Cidade" />
            </div>
            <div class="col-3">
              <text-input v-model="address.state" mask="AA" label="UF" />
            </div>
          </div>
        </expansion-item>

        <expansion-item label="Outros Detalhes">
          <cpf-cnpj-input v-model="customer.document_number" label="CPF/CNPJ" />
          <textarea-input v-model="customer.notes" label="Anotações" />
        </expansion-item>

        <q-btn
          flat
          rounded
          no-caps
          color="negative"
          label="Excluir cliente"
          class="q-mt-lg -q-mx-md"
          :loading="loading.value"
          @click="handleRemoveCustomer()"
        />
      </page-body>
    </q-form>
  </page>
</template>
