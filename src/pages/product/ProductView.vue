<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useTools } from 'src/composables';
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

const { loading, product, getProduct, removeProduct } = useProducts();
const { confirm, notify, fmt } = useTools();

const form = ref({
  price: 0,
  cost_price: 0
});

const price_profit = ref(0);
const price_markup = ref(0);

watch(
  () => (product.value.price, product.value.cost_price),
  () => {
    let profit = 0;
    let markup = 0;
    const price = parseFloat(product.value.price);
    const cost_price = parseFloat(product.value.cost_price);
    if (price > 0 && cost_price > 0) {
      profit = ((price - cost_price) / price) * 100;
      markup = ((price - cost_price) / cost_price) * 100;
    }
    price_profit.value = Math.round(profit) + '%';
    price_markup.value = Math.round(markup) + '%';
  }
);

const handleRemoveProduct = async () => {
  try {
    confirm.delete(`do produto: ${product.value.name}`).onOk(async () => {
      await removeProduct(product.value.id);
      notify.success('Produto excluido.');
      router.push({ name: 'product-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir o produto', error);
  }
};

const handleGetProduct = async () => {
  try {
    const data = await getProduct(route.params.id);
    product.value = data[0];
  } catch (error) {
    notify.error('Erro ao obter o produto.', error);
  }
};

onMounted(async () => {
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
            <fab-remove-action :loading="loading.value" @click="handleRemoveProduct(form)" />
            <fab-edit-action :loading="loading.value" :to="{ name: 'product-form' }" />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="product.name" label="Nome do Produto" />

        <text-view v-if="product.brand" :value="product.brand" label="Marca" />

        <text-view v-if="product.details" :value="product.details" label="Detalhes" />

        <text-view
          v-if="product.price > 0"
          :value="fmt.currency(product.price) + '/' + product.measure_unit"
          label="Preço"
        />

        <expansion-item label="Custo e Lucro">
          <text-view :value="fmt.currency(product.cost_price)" label="Preço de custo" />

          <text-view :value="price_profit" label="lucro" />

          <text-view :value="price_markup" label="Markup" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
