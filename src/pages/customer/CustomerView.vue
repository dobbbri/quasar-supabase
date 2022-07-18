<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useCustomersAddresses, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  BtnBack,
  TextView,
  FabMenu,
  FabEditAction,
  FabRemoveAction,
  ExpansionItem
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getCustomer, removeCustomer } = useCustomers();
const { getAddresses, removeAddresses } = useCustomersAddresses();
const { confirm, notify } = useTools();

const form = ref({});
const formAddress = ref({
  id: 0
});

const handleEditCustomer = (customer) => {
  router.push({ name: 'customer-form', params: { id: customer.id } });
};

const handleRemoveCustomer = async (customer) => {
  try {
    confirm.delete(`do cliente: ${customer.name}`).onOk(async () => {
      await removeCustomer(customer.id);
      if (formAddress.value && formAddress.value.id > 0) {
        await removeAddresses(formAddress.value.id);
      }
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
    form.value = data[0];
    data = await getAddresses(form.value.id);
    if (data) formAddress.value = data[0];
  } catch (error) {
    notify.error('Erro a o obter o cliente.', error);
  }
};

const addressFormated = computed(() => {
  if (formAddress.value.id > 0) {
    return [
      `${formAddress.value.street}, ${formAddress.value.number}, ${formAddress.value.complement},`,
      `${formAddress.value.neighborhood}, ${formAddress.value.city} - ${formAddress.value.state}, CEP ${formAddress.value.zip_code}`
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
            <fab-remove-action :loading="loading.value" @click="handleRemoveCustomer(form)" />
            <fab-edit-action :loading="loading.value" @click="handleEditCustomer(form)" />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <expansion-item default-opened label="Informação do Cliente" style="margin-top: -20px">
          <text-view :value="form.name" label="Nome do Cliente" />

          <text-view v-if="form.email" :value="form.email" label="Email" />

          <text-view
            v-if="form.phone_1 || form.phone_2"
            :value="form.phone_1"
            :value2="form.phone_2"
            label="Telefone"
          />

          <text-view
            v-if="formAddress.id > 0"
            :value="addressFormated[0]"
            :value2="addressFormated[1]"
            label="Endereço"
          />

          <text-view
            v-if="form.document_number"
            :value="form.document_number"
            :label="form.is_legal_entity ? 'CNPJ' : 'CPF'"
          />

          <text-view v-if="form.notes" :value="form.notes" label="Anotações" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
