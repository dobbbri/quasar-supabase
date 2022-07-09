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

const { loading, getProduct, removeProduct } = useProducts();
const { confirm, notify, fmt } = useTools();

const form = ref({
  price: 0,
  coust_price: 0
});

const price_profit = ref(0);
const price_markup = ref(0);

watch(
  () => (form.value.price, form.value.coust_price),
  () => {
    let profit = 0;
    let markup = 0;
    const price = parseFloat(form.value.price);
    const coust_price = parseFloat(form.value.coust_price);
    if (price > 0 && coust_price > 0) {
      profit = ((price - coust_price) / price) * 100;
      markup = ((price - coust_price) / coust_price) * 100;
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
    const data = await getProduct(route.params.id);
    form.value = data[0];
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
            <fab-edit-action :loading="loading.value" @click="handleEditProduct(form)" />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view v-if="!form.active" class="disabled-text" label="*** desativado ***" />

        <text-view :value="form.name" label="Nome do Produto" />

        <text-view v-if="form.brand" :value="form.brand" label="Marca" />

        <text-view v-if="form.detail" :value="form.detail" label="Detalhes" />

        <text-view :value="fmt.currency(form.price) + '/' + form.measure_unit" label="Preço" />

        <expansion-item label="Custo e Lucro">
          <text-view :value="fmt.currency(form.coust_price)" label="Preço de custo" />

          <text-view :value="price_profit" label="lucro" />

          <text-view :value="price_markup" label="Markup" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
