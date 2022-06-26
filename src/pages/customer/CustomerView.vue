<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useTools } from 'src/composables';
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
const { confirm, notify } = useTools();

const isEditMode = computed(() => (route.params.id ? true : false));

const form = ref({
  name: '',
  email: '',
  phone_1: '',
  phone_2: '',
  active: true
});

const handleEditCustomer = (customer) => {
  router.push({ name: 'customer-form', params: { id: customer.id } });
};

const handleRemoveCustomer = async (customer) => {
  try {
    confirm.delete(`do cliente: ${customer.name}`).onOk(async () => {
      await removeCustomer(customer.id);
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
    notify.error('Erro ao obter o cliente.', error);
  }
};

onMounted(() => {
  if (isEditMode.value) handleGetCustomer();
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
        <text-view :value="form.name" label="Nome" />
        <text-view :value="form.email" label="Email" />
        <text-view :value="form.phone_1" label="Celular/Whatsapp" />
        <text-view :value="form.phone_2" label="Celular/Telefone fixo" />
        <text-view :value="form.active ? 'Cliente Ativo' : 'Cliente Desativado'" />
      </page-body>
    </q-form>
  </page>
</template>
