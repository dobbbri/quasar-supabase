<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrders, useTools, useActive } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  BtnBack,
  BtnSave,
  SelectInput,
  DateInput,
  TextareaInput,
  ExpansionItem
} from 'src/components';

const router = useRouter();

const { active, fromTabMenu } = useActive();
const { loading, order, addOrder, editOrder } = useOrders();
const { notify } = useTools();

const isEditMode = computed(() => (order.value && order.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (!fromTabMenu.value) {
    router.push({ name: 'main-menu' });
  } else {
    router.push({ name: 'order-list' });
  }
};

const selectCustomer = () => {
  active.value.fromForm = 'order-form';
  router.push({ name: 'customer-list' });
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
          <btn-back v-if="!fromTabMenu" @click="handleBackTo()" />
        </template>
        <template #title>{{ title }} Pedido</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <expansion-item :fake="true" label="Pedido">
          <select-input label="Cliente" :text="active.customerName" @focus="selectCustomer()" />
          <textarea-input v-model="order.reference" label="Referencia" />
        </expansion-item>

        <expansion-item default-opened label="Informações básica">
          <date-input v-model:date="order.delivery_date" label="Data de entrega" />
          <date-input v-model:date="order.budget_deadline" label="Validade do orçamento" />
          <date-input v-model:date="order.deadline" label="Prazo de execução" />
          <textarea-input v-model="order.notes" label="Observações" />
        </expansion-item>
        <expansion-item label="Itens do pedido"> </expansion-item>
        <expansion-item label="Detalhes"> </expansion-item>
        <br />
        cliente: {{ active.customerName }} <br />
        active: {{ active }}
        <br />
        order: {{ order }}
      </page-body>
    </q-form>
  </page>
</template>
