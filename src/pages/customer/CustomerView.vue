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
  neighborhood: '',
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
    const data = await getCustomer(route.params.id);
    form.value = data[0];
    const data2 = await getAddresses(form.value.id);
    if (data2) formAddress.value = data2[0];
  } catch (error) {
    notify.error('Erro a o obter o cliente.', error);
  }
};

const addressFormated = computed(() => {
  const ad = formAddress.value;
  if (
    ad.street ||
    ad.number ||
    ad.complement ||
    ad.neighborhood ||
    ad.city ||
    ad.state ||
    ad.zip_code
  ) {
    return [
      `${ad.street}, ${ad.number}, ${ad.complement},`,
      `${ad.neighborhood}, ${ad.city} - ${ad.state}, CEP ${ad.zip_code}`
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
        <text-view
          :value="form.name"
          :value2="form.active ? '' : '*** Cliente Desativado ***'"
          label="Nome do Cliente"
        />

        <text-view :value="form.name" label="Nome do Cliente" />

        <text-view v-if="form.email" :value="form.email" label="Email" />

        <text-view
          v-if="form.phone_1 || form.phone_2"
          :value="form.phone_1"
          :value2="form.phone_2"
          label="Celular/Whatsapp"
        />

        <text-view
          v-if="addressFormated"
          :value="addressFormated[0]"
          :value2="addressFormated[1]"
          label="Endereço"
        />
      </page-body>
    </q-form>
  </page>
</template>
