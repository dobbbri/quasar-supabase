<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useCategories, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  MoneyInput,
  CheckBox,
  SelectOptions,
  TextareaInput,
  ExpansionItem,
  BtnBack,
  BtnSave
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getProduct, addProduct, editProduct } = useProducts();
const { getCategories } = useCategories();
const { notify } = useTools();

const optionsCategories = ref([]);
const optionsMeasureUnits = ref([]);
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

const isEditMode = computed(() => (route.params.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (route.params.id) {
    router.push({ name: 'product-view', params: { id: route.params.id } });
  } else {
    router.push({ name: 'product-list' });
  }
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editProduct(form.value);
    } else {
      await addProduct(form.value);
    }
    notify.success(`Produto ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'product-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o produto.`, error);
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

const handleGetCategories = async () => {
  try {
    optionsCategories.value = await getCategories('id, name, active');
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error);
  }
};

onMounted(async () => {
  await handleGetCategories();
  if (isEditMode.value) await handleGetProduct();
});
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back @click="handleBackTo()" />
        </template>
        <template #title>{{ title }}</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="form.name"
          label="Nome do produto"
          :rules="[(val) => val && val.length > 3]"
          error-message="O nome do produto deve ser informado!"
        />

        <select-options
          v-model="form.category_id"
          label="Categoria"
          :options="optionsCategories"
          :rules="[(val) => !!val]"
          error-message="Uma categoria deve ser selecionada"
        />

        <expansion-item default-opened group="price" label="Preço">
          <money-input
            v-model="form.price_to_sell"
            label="Preço de venda"
            :rules="[(val) => !!val]"
            error-message="O preço de venda do produto deve ser informado"
          />

          <select-options
            v-model="form.measure_unit"
            label="Unidade de medida"
            :options="optionsMeasureUnits"
            :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
            :rules="[(val) => !!val]"
            error-message="Uma unidade de medida deve ser selecionada"
            :use-template="2"
          />
        </expansion-item>

        <expansion-item default-opened label="Custo e Lucro">
          <money-input v-model="form.price_to_buy" label="Preço de custo" />
          <div class="line row q-gutter-x-md">
            <div class="line col">
              <text-input
                v-model="price_profit"
                label="lucro"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
            <div class="line col">
              <text-input
                v-model="price_markup"
                label="Markup"
                input-class="text-center no-pointer-events"
                readonly
              />
            </div>
          </div>
        </expansion-item>

        <expansion-item label="Avançado">
          <text-input v-model="form.brand" label="Marca" />

          <textarea-input v-model="form.description" label="Descrição do produto" />

          <text-input v-model="form.code_bar" label="Código de barras" />
        </expansion-item>

        <check-box
          v-model="form.active"
          :label="form.active ? 'Produto Ativo' : 'Produto Desativado'"
        />
      </page-body>
    </q-form>
  </page>
</template>
