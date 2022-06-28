<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useCategories, useTools } from 'src/composables';
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

const { loading, getProduct, removeProduct } = useProducts();
const { getCategories } = useCategories();
const { confirm, notify } = useTools();

const optionsCategories = ref([]);

const form = ref({
  category_id: '',
  name: '',
  description: '',
  price_to_sell: 0,
  measure_unit: 'un.',
  price_to_buy: 0,
  has_stock_control: false,
  stock_amount: 0,
  stock_minimum_amount: 0,
  brand: '',
  code_bar: '',
  image_name: null,
  active: true
});

const price_profit = ref(0);
const price_markup = ref(0);

watch(
  () => (form.value.price_to_sell, form.value.price_to_buy),
  () => {
    let profit = 0;
    let markup = 0;
    const price_to_sell = parseFloat(form.value.price_to_sell);
    const price_to_buy = parseFloat(form.value.price_to_buy);
    if (price_to_sell > 0 && price_to_buy > 0) {
      profit = ((price_to_sell - price_to_buy) / price_to_sell) * 100;
      markup = ((price_to_sell - price_to_buy) / price_to_buy) * 100;
    }
    price_profit.value = Math.round(profit) + '%';
    price_markup.value = Math.round(markup) + '%';
  }
);

const handleEditProduct = (product) => {
  router.push({ name: 'product-form', params: { id: product.id } });
};

const handleRemoveProduct = async (product) => {
  try {
    confirm.delete(`do produto: ${product.name}`).onOk(async () => {
      await removeProduct(product.id);
      notify.success('Produto excluido.');
      router.push({ name: 'product-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir o produto', error);
  }
};

const handleGetProduct = async () => {
  try {
    form.value = await getProduct(route.params.id);
  } catch (error) {
    notify.error('Erro ao obter o produto.', error);
  }
};

const handleGetCategories = async () => {
  try {
    optionsCategories.value = await getCategories('id, name, active');
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error);
  }
};

onMounted(async () => {
  await handleGetCategories();
  await handleGetProduct();
});
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'product-list' }" />
        </template>
        <template #title>Produto</template>
        <template #right>
          <fab-menu>
            <fab-remove-action
              :loading="loading.remove.value"
              :disable="loading.disable.value"
              @click="handleRemoveProduct(form)"
            />
            <fab-edit-action
              :loading="loading.edit.value"
              :disable="loading.disable.value"
              @click="handleEditProduct(form)"
            />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="form.name" label="Nome do Produto" />
        <text-view :value="form.active ? 'Produto Ativo' : 'Produto Desativado'" />
      </page-body>
    </q-form>
  </page>
</template>
