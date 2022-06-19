<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useCategories, useTools, useDefaults } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  PageFooter,
  TextInput,
  MoneyInput,
  CheckBox,
  SelectOptions,
  TextareaInput,
  ExpansionItem
} from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

const router = useRouter();
const route = useRoute();
const store = useSettingsStore();

const {
  loading,
  productFolder,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  getProductImageURL,
  addProductImage,
  editProductImage,
  removeProductImage
} = useProducts();
const { getCategories } = useCategories();
const { confirm, notify } = useTools();
const { attr } = useDefaults();

const optionsCategories = ref([]);
const optionsMeasureUnits = ref([]);
const newImage = ref(null);
const image = ref(null);
const file = ref(null);
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

const handleSelectImage = () => file.value.pickFiles();

const loadImage = () => {
  if (image.value) {
    newImage.value = URL.createObjectURL(image.value);
  }
};

const handleSubmit = async () => {
  try {
    if (image.value) {
      if (form.value.image_name) {
        await editProductImage(form.value.image_name, image.value);
      } else {
        const filePath = await addProductImage(productFolder, image.value);
        form.value.image_name = filePath;
      }
    }
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

const handleRemoveProduct = async (product) => {
  try {
    confirm.delete(`do produto: ${product.name}`).onOk(async () => {
      if (product.image_name) {
        await removeProductImage(product.image_name);
      }
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
    if (form.value.image_name) {
      newImage.value = getProductImageURL(form.value.image_name) + '?t=' + new Date().getTime();
    }
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
  optionsMeasureUnits.value = store.measureUnits;
  await handleGetCategories();
  if (isEditMode.value) await handleGetProduct();
});
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <q-btn
            v-bind="attr.btn.icon"
            icon="sym_r_arrow_back_ios_new"
            flat
            :to="{ name: 'product-list' }"
          >
            <q-tooltip>Voltar</q-tooltip>
          </q-btn>
        </template>
        <template #title>{{ title + ' produto' }}</template>
        <template #right>
          <q-btn
            v-if="isEditMode"
            v-bind="attr.btn.icon"
            icon="sym_r_delete"
            color="negative"
            unelevated
            :loading="loading.remove.value"
            :disable="loading.disable.value"
            @click="handleRemoveProduct(form)"
          >
            <q-tooltip>Excluir</q-tooltip>
          </q-btn>
        </template>
      </page-header>

      <page-body>
        <select-options
          v-model="form.category_id"
          label="Categoria"
          :options="optionsCategories"
          :rules="[(val) => !!val]"
          error-message="Uma categoria deve ser selecionada"
        />

        <text-input
          v-model="form.name"
          label="Nome"
          :rules="[(val) => val && val.length > 3]"
          error-message="O nome do produto deve ser informado!"
        />

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

        <expansion-item default-opened label="Custo e lucro">
          <money-input v-model="form.price_to_buy" label="Preço de custo" />

          <div class="line row q-gutter-x-md">
            <div class="line col">
              <q-input
                v-bind="attr.input.basic"
                v-model="price_profit"
                label="lucro"
                input-class="text-center"
                readonly
              />
            </div>
            <div class="line col">
              <q-input
                v-bind="attr.input.basic"
                v-model="price_markup"
                label="Markup"
                input-class="text-center"
                readonly
              />
            </div>
          </div>
        </expansion-item>

        <expansion-item label="Estoque">
          <check-box v-model="form.has_stock_control" label="Contolar quantidade em estoque" />

          <!-- <q-input -->
          <!--   v-bind="attr.input.basic" -->
          <!--   v-model="form.stock_amount" -->
          <!--   label="Quantidade em Estoque" -->
          <!--   mask="#" -->
          <!--   fill-mask="0" -->
          <!--   reverse-fill-mask -->
          <!--   readonly -->
          <!-- /> -->
          <!--  -->
          <!-- <q-input -->
          <!--   v-bind="attr.input.basic" -->
          <!--   v-model="form.stock_minimum_amount" -->
          <!--   label="Quantidade mínima em estoque" -->
          <!--   mask="#" -->
          <!--   fill-mask="0" -->
          <!--   reverse-fill-mask -->
          <!--   readonly -->
          <!-- /> -->

          <q-btn
            v-if="form.has_stock_control"
            v-bind="attr.btn.basic"
            label="Controlar Estoque"
            color="primary"
            icon-right="sym_r_arrow_forward_ios"
            flat
            align="left"
            class="full-width my-btn"
            :to="{ name: 'stock-form' }"
          />

          <q-btn
            v-if="form.has_stock_control"
            v-bind="attr.btn.basic"
            label="Lista de Movimentação do Estoque"
            color="primary"
            icon-right="sym_r_arrow_forward_ios"
            flat
            align="left"
            class="full-width my-btn"
            :to="{ name: 'stock-form' }"
          />
        </expansion-item>

        <expansion-item label="Avançado">
          <q-file
            ref="file"
            v-model="image"
            class="hidden"
            accept="image/*"
            @update:model-value="loadImage()"
          />
          <div
            style="max-height: 200px; max-width: 200px; border: 1px solid rgba(0, 0, 0, 0.3)"
            class="rounded-borders"
          >
            <q-img
              loading="lazy"
              :src="newImage"
              fit="cover"
              style="max-height: 200px; max-width: 200px"
              class="rounded-borders overflow-hidden"
              spinner-color="primary"
            >
              <div class="absolute-bottom">
                <q-btn
                  flat
                  no-wrap
                  class="full-width q-pa-xs"
                  icon="sym_r_add_circle"
                  label="Adicionar Imagem"
                  @click="handleSelectImage()"
                />
              </div>
            </q-img>
          </div>

          <text-input v-model="form.brand" label="Marca" />

          <textarea-input v-model="form.description" label="Descrição do produto" />

          <text-input v-model="form.code_bar" label="Código de barras" />
        </expansion-item>

        <check-box v-model="form.active" label="Produto ativo" />

        <page-footer>
          <q-btn
            v-bind="attr.btn.basic"
            label="Cancelar"
            outline
            class="col-4 bg-white"
            :disable="loading.disable.value"
            :to="{ name: 'product-list' }"
          />

          <q-space />

          <q-btn
            v-bind="attr.btn.basic"
            label="Gravar"
            unelevated
            class="col-4"
            :loading="isEditMode ? loading.edit.value : loading.add.value"
            :disable="loading.disable.value"
            type="submit"
          />
        </page-footer>
      </page-body>
    </q-form>
  </page>
</template>
