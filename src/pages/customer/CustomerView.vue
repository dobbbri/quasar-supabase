<script setup>
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useTools } from 'src/composables';

const router = useRouter();
const route = useRoute();

const { loading, customer, address, getCustomer, getAddress, removeCustomerAddress } =
  useCustomers();
const { confirm, notify } = useTools();

const handleRemoveCustomer = async () => {
  try {
    confirm.delete(`do cliente: ${customer.value.name}`).onOk(async () => {
      await removeCustomerAddress(customer.value, address.value);
      notify.success('Cliente excluido.');
      router.push({ name: 'customer-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir o cliente', error);
  }
};

const handleGetCustomer = async () => {
  try {
    let data = await getCustomer(route.params.id);
    customer.value = data[0];
    data = await getAddress(customer.value.id);
    if (data) address.value = data[0];
  } catch (error) {
    notify.error('Erro a o obter o cliente.', error);
  }
};

const addressFormated = computed(() => {
  if (address.value && address.value.street > 0) {
    return [
      `${address.value.street}, ${address.value.number}, ${address.value.complement},`,
      `${address.value.neighborhood}, ${address.value.city} - ${address.value.state}, CEP ${address.value.zip_code}`
    ];
  }
  return null;
});

onMounted(async () => {
  await handleGetCustomer();
});
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'customer-list' }" />
        </template>
        <template #title>Cliente</template>
        <template #right>
          <fab-menu>
            <fab-remove-action :loading="loading.value" @click="handleRemoveCustomer()" />
            <fab-edit-action :loading="loading.value" :to="{ name: 'customer-form' }" />
          </fab-menu>
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
