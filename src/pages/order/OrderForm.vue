<script setup>
import { computed, onMounted } from 'vue';
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
  ExpansionItem,
  ItemBtn
} from 'src/components';

const router = useRouter();

const { active, fromTabMenu } = useActive();
const { loading, order, serviceList, productList, addOrder, editOrder } = useOrders();
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

onMounted(async () => {
  active.value.fromForm = 'order-form';
});
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
          <div class="line row q-gutter-x-md">
            <div class="col">
              <text-input
                v-model="price_profit"
                label="Número"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
            <div class="col">
              <text-input
                v-model="price_markup"
                label="Data"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
          </div>

          <select-input label="Cliente" :text="order.customerName" @focus="selectCustomer()" />
          <textarea-input v-model="order.reference" label="Sobre oque é o pedido" />
        </expansion-item>

        <expansion-item group="basic" default-opened label="Informações básica">
          <date-input v-model:date="order.delivery_date" label="Data de entrega" />
          <date-input v-model:date="order.budget_deadline" label="Validade do orçamento" />
          <date-input v-model:date="order.deadline" label="Prazo de execução" />
        </expansion-item>

        <expansion-item group="itens" default-opened label="Itens do pedido">
          <item-btn label="Serviços" type="plus" :to="{ name: 'service-list' }" />
          <item-btn label="Produtos" type="plus" :to="{ name: 'product-list' }" />
          <item-btn label="Desconto" type="plus" :to="{ name: 'measure-unit-form' }" />
        </expansion-item>

        <expansion-item group="details" default-opened label="Detalhes">
          <item-btn
            label="Condições de pagamento"
            type="plus"
            :to="{ name: 'measure-unit-form' }"
          />
          <item-btn label="Meios de pagamento" type="arrow" :to="{ name: 'measure-unit-form' }" />
          <item-btn label="Garantia" type="plus" :to="{ name: 'measure-unit-form' }" />
          <textarea-input v-model="order.comments" label="Informações adicionais" />
        </expansion-item>
        <br />
        active: {{ active }}
        <br />
        order: {{ order }}
        <br />
        services: {{ serviceList }}
        <br />
        products: {{ productList }}
      </page-body>
    </q-form>
  </page>
</template>
