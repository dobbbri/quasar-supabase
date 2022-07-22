<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useTools, useActive } from 'src/composables';
import { Page, PageHeader, PageBody, BtnBack, BtnSave } from 'src/components';

const router = useRouter();

const formName = 'order-form';

const { active } = useActive();
const { loading, order, addOrder, editOrder } = useOrders();
const { notify } = useTools();

const isEditMode = computed(() => (order.value && order.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (active.value.formName == formName.value) {
    router.push({ name: 'main-menu' });
  } else if (active.value.formName !== formName.value) {
    router.push({ name: active.value.formName });
  } else {
    router.push({ name: 'order-list' });
  }
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editOrder(order.value);
    } else {
      await addOrder(order.value);
    }
    notify.success(`Pedido ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'order-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o serviço.`, error);
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back @click="handleBackTo()" />
        </template>
        <template #title>{{ title }} Pedido</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <q-btn :to="{ name: 'customer-list', params: { backTo: 'order-form' } }">xxxxx</q-btn>
        <br />
        cliente: {{ active.customerName }} <br />
        {{ active }}
        <br />
        {{ order }}
      </page-body>
    </q-form>
  </page>
</template>
