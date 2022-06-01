<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDefaults } from 'src/composables';
import { PageHeader } from 'src/components';
import { useStockStore } from 'src/stores/stockStore';

const router = useRouter();
const { attr } = useDefaults();
const stockStore = useStockStore();

const optionsMovement = ref([
  { id: '+', name: 'Entrada de produtos' },
  { id: '-', name: 'Saida de produtos' },
  { id: '=', name: 'Reajustar estoque' }
]);

const productForm = ref({
  amount: stockStore.productAmount,
  minimum_amount: stockStore.productMinimumAmount,
  new_amount: 0
});

const stockForm = ref({
  amount: 0,
  type: '+'
});

const handleSubmit = () => {
  if (stockForm.value.type == '+') {
    productForm.value.new_amount =
      parseInt(productForm.value.stock_amount) +
      parseInt(stockForm.value.amount);
  } else if (stockForm.value.type == '-') {
    productForm.value.new_amount =
      parseInt(productForm.value.stock_amount) -
      parseInt(stockForm.value.amount);
  } else {
    productForm.value.new_amount = stockForm.value.amount;
  }

  stockStore.setProduct(
    productForm.value.amount,
    productForm.value.minimum_amount,
    productForm.value.new_amount
  );
  stockStore.setMovement(stockForm.value.amount, stockForm.value.type);

  router.back();
};

const quantidadeLabel = '';

watch(
  () => stockForm.value.type,
  () => (quantidadeLabel.value = ajustarLabel(stockForm.value.type))
);

const ajustarLabel = (type) => {
  return type == '+'
    ? 'Adicionar ao estoque atual'
    : type == '-'
    ? 'Remover do estoque atual'
    : 'Ajustar o estoque atual';
};
</script>

<template>
  <q-form
    v-bind="attr.form"
    @submit.prevent="handleSubmit"
  >
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          icon="sym_r_arrow_back_ios_new"
          flat
          @click="router.back()"
        />
      </template>
      <template #title>Contolar Estoque</template>
      <template #right>
        <q-btn
          v-bind="attr.btn.basic"
          label="Gravar"
          type="submit"
        />
      </template>
    </page-header>

    <q-page
      padding
      class="q-gutter-y-sm"
    >

      <q-select
        v-bind="attr.input.basic"
        v-model="stockForm.type"
        label="Tipo de movimentação"
        :options="optionsMovement"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        :rules="[(val) => !!val]"
        error-message="Um tipo deve ser selecionado"
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="stockForm.amount"
        :label="quantidadeLabel"
        mask="#"
        fill-mask="0"
        reverse-fill-mask
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="productForm.minimum_amount"
        label="Quantidade mínima em estoque"
        mask="#"
        fill-mask="0"
        reverse-fill-mask
      />
    </q-page>
  </q-form>
</template>
