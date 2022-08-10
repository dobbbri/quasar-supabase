<script setup>
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useTools } from 'src/composables';

const router = useRouter();
const route = useRoute();

const { loading, calcPctMakup, calcPctProfit, product, getProduct, removeProduct } = useProducts();
const { confirm, notify, fmt } = useTools();

const markup = computed(() => {
  const unit_price = parseFloat(product.value.unit_price) || 0;
  const cost_price = parseFloat(product.value.cost_price) || 0;
  if (unit_price > 0 && cost_price > 0) {
    return `${calcPctMakup(unit_price, cost_price)}%`;
  }
  return '';
});

const profit = computed(() => {
  const unit_price = parseFloat(product.value.unit_price) || 0;
  const cost_price = parseFloat(product.value.cost_price) || 0;
  if (unit_price > 0 && cost_price > 0) {
    return `${calcPctProfit(unit_price, cost_price)}%`;
  }
  return '';
});

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
          v-if="product.unit_price > 0"
          :value="fmt.currency(product.unit_price) + '/' + product.measure_unit"
          label="Preço de venda"
        />

        <expansion-item label="Custo e Lucro">
          <text-view :value="fmt.currency(product.cost_price)" label="Preço de custo" />

          <text-view :value="profit" label="Margen de lucro" />

          <text-view :value="markup" label="Markup" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
