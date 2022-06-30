<script setup>
import { ref, computed, onMounted } from 'vue';
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
  FabRemoveAction
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getCustomer, removeCustomer } = useCustomers();
const { getAddresses, removeAddresses } = useCustomersAddresses();
const { confirm, notify } = useTools();

const form = ref({
  name: '',
  email: '',
  phone_1: '',
  phone_2: '',
  active: true
});

const formAddress = ref({
  id: 0,
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  zip_code: ''
});

const handleEditCustomer = (customer) => {
  router.push({ name: 'customer-form', params: { id: customer.id } });
};

const handleRemoveCustomer = async (customer) => {
  try {
    confirm.delete(`do cliente: ${customer.name}`).onOk(async () => {
      await removeCustomer(customer.id);
      if (formAddress.value && formAddress.value.id) {
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
    form.value = await getCustomer(route.params.id);
  } catch (error) {
    notify.error('Erro a o obter o cliente.', error);
  }
};

const handleGetAddress = async () => {
  try {
    formAddress.value = await getAddresses(form.value.id);
  } catch (error) {
    notify.error('Erro ao obter o cliente.', error);
  }
};

const addressFormated = computed(() => {
  const ad = formAddress.value;
  return [
    `${ad.street}, ${ad.number}, ${ad.complement},`,
    `${ad.district} - ${ad.state}, CEP ${ad.zip_code}`
  ];
});

onMounted(() => {
  handleGetCustomer();
  handleGetAddress();
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
            <fab-remove-action
              :loading="loading.remove.value"
              :disable="loading.disable.value"
              @click="handleRemoveCustomer(form)"
            />
            <fab-edit-action
              :loading="loading.edit.value"
              :disable="loading.disable.value"
              @click="handleEditCustomer(form)"
            />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="form.name" label="Nome do Cliente" />
        <text-view :value="form.email" label="Email" />
        <text-view :value="form.phone_1" label="Celular/Whatsapp" />
        <text-view :value="form.phone_2" label="Celular/Telefone fixo" />
        <text-view :value="form.active ? 'Cliente Ativo' : 'Cliente Desativado'" />
        <text-view :value="addressFormated[0]" :value2="addressFormated[1]" label="Endereço" />
      </page-body>
    </q-form>
  </page>
</template>
