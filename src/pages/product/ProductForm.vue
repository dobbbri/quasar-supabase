<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  useProducts,
  useCategories,
  useTools,
  useDefaults
} from 'src/composables';
import { PageHeader, PageFooter } from 'src/components';
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
  name: '',
  category_id: '',
  stock_is_automatic: false,
  stock_amount: 0,
  stock_minimum_amount: 0,
  measure_unit: 'un.',
  price_to_buy: 0,
  price_to_sell: 0,
  code_bar: '',
  code_internal: '',
  description: '',
  brand: '',
  active: true,
  image_name: null
});

const stockExpanded = ref(false);
const imageExpanded = ref(false);
const advancedExpanded = ref(false);

const isEditMode = computed(() => (route.params.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleSelectImage = () => file.value.pickFiles();

const loadImage = () => {
  if (image.value) {
    newImage.value = URL.createObjectURL(image.value);
  }
};

const stockForm = ref({
  product_id: 0,
  amount: 0,
  type: ''
});

const stockAmountRead = ref(0);
const showStockForm = ref(false);
const stockFormTitle = ref('');
const stockFormAction = ref('');
const stockFormColor = ref('');

const showStockModal = (action) => {
  stockForm.value.type = action;
  if (action == '+') {
    stockFormTitle.value = 'Entrada de Produtos';
    stockFormAction.value = 'Adicionar';
    stockFormColor.value = 'text-positive';
  } else if (action == '-') {
    stockFormTitle.value = 'Saida de Produtos';
    stockFormAction.value = 'Remover';
    stockFormColor.value = 'text-negative';
  } else {
    stockFormTitle.value = 'Corrigir Quantidade';
    stockFormAction.value = 'Ajustar';
    stockFormColor.value = 'text-info';
  }
  showStockForm.value = true;
};

const updateStockAmount = () => {
  if (stockForm.value.type == '+') {
    form.value.stock_amount =
      parseInt(stockAmountRead.value) + parseInt(stockForm.value.amount);
  } else if (stockForm.value.type == '-') {
    form.value.stock_amount =
      parseInt(stockAmountRead.value) - parseInt(stockForm.value.amount);
  } else {
    form.value.stock_amount = stockForm.value.amount;
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
    stockAmountRead.value = form.value.stock_amount;
    if (form.value.image_name) {
      const forceUpdate = '?t=' + new Date().getTime();
      newImage.value = getProductImageURL(form.value.image_name) + forceUpdate;
      imageExpanded.value = true;
    }
    if (form.value.code_bar || form.value.code_internal)
      advancedExpanded.value = true;
    stockExpanded.value = form.value.stock_is_automatic;
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

    <q-page
      padding
      class="q-gutter-y-sm"
    >
      <q-input
        v-bind="attr.input.basic"
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome do produto deve ser informado!"
      />

      <q-select
        v-bind="attr.input.basic"
        v-model="form.category_id"
        label="Categoria"
        :options="optionsCategories"
        option-value="id"
        option-label="name"
        :option-disable="
          (opt) => (Object(opt) === opt ? opt.active === false : false)
        "
        map-options
        emit-value
        :rules="[(val) => !!val]"
        error-message="Uma categoria deve ser selecionada"
      >
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label
                :class="{ 'text-negative text-strike': !scope.opt.active }"
              >
                {{ scope.opt.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        v-bind="attr.input.basic"
        v-model="form.price_to_buy"
        label="Preço de compra"
        prefix="R$"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[(val) => !!val]"
        error-message="O preço de compra do produto deve ser informado"
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.price_to_sell"
        label="Preço de venda"
        prefix="R$"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[(val) => !!val]"
        error-message="O preço de venda do produto deve ser informado"
      />

      <q-select
        v-bind="attr.input.basic"
        v-model="form.measure_unit"
        label="Unidade de medida"
        :options="optionsMeasureUnits"
        option-value="abbr"
        option-label="name"
        :option-disable="
          (opt) => (Object(opt) === opt ? opt.active === false : false)
        "
        emit-value
        map-options
        :rules="[(val) => !!val]"
        error-message="Uma unidade de medida deve ser selecionada"
      />

      <q-expansion-item
        v-model="stockExpanded"
        label="Estoque"
        class="b-1px q-mt-md"
        header-class="text-primary bg-indigo-1 text-weight-medium rounded-borders"
        dense
      >
        <div class="q-gutter-y-sm q-pa-md">
          <q-checkbox
            v-bind="attr.input.basic"
            v-model="form.stock_is_automatic"
            label="Utilizar estoque automático"
            class="checkbox-fix"
            style="margin-bottom: -16px"
          />

          <q-banner
            v-if="form.stock_is_automatic"
            v-bind="attr.banner"
          >
            A quantidade em estoque deste produto será ajustado automáticamente
            após cada venda.
          </q-banner>

          <q-input
            v-bind="attr.input.basic"
            v-model="form.stock_minimum_amount"
            :disable="!form.stock_is_automatic"
            label="Quantidade mínima em estoque"
            mask="#"
            fill-mask="0"
            reverse-fill-mask
          />

          <div class="q-px-md q-pb-md bg-indigo-1 rounded-borders">
            <q-input
              v-bind="attr.input.basic"
              v-model="form.stock_amount"
              :disable="!form.stock_is_automatic"
              label="Quantidade em estoque"
              mask="#"
              fill-mask="0"
              reverse-fill-mask
              readonly
            />

            <div class="q-mt-none row q-gutter-md">
              <q-btn
                :disable="!form.stock_is_automatic"
                v-bind="attr.btn.basic"
                label="Entrada"
                unelevated
                color="positive"
                text-color="white"
                class="col"
                @click="showStockModal('+')"
              />
              <q-btn
                :disable="!form.stock_is_automatic"
                v-bind="attr.btn.basic"
                label="Saida"
                unelevated
                color="negative"
                text-color="white"
                class="col"
                @click="showStockModal('-')"
              />
              <q-btn
                :disable="!form.stock_is_automatic"
                v-bind="attr.btn.basic"
                label="Ajustar"
                unelevated
                color="info"
                text-color="white"
                class="col"
                @click="showStockModal('=')"
              />
            </div>
          </div>
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-model="imageExpanded"
        label="Imagem/Foto"
        class="b-1px q-mt-md"
        header-class="text-primary bg-indigo-1 text-weight-medium rounded-borders"
        dense
      >
        <div class="q-gutter-y-sm q-pb-md q-pa-md">
          <q-file
            ref="file"
            v-model="image"
            class="hidden"
            accept="image/*"
            @update:model-value="loadImage()"
          />
          <q-card
            flat
            bordered
            style="max-height: 150px; max-width: 150px"
          >
            <q-img
              loading="lazy"
              :src="newImage"
              fit="cover"
              spinner-color="primary"
            >
              <div
                class="absolute-bottom"
                style="padding: 0"
              >
                <q-btn
                  flat
                  class="full-width q-py-sm"
                  icon="sym_r_add_circle"
                  label="Adicionar"
                  @click="handleSelectImage()"
                />
              </div>
            </q-img>
          </q-card>
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-model="advancedExpanded"
        label="Avançado"
        class="b-1px q-mt-md"
        header-class="text-primary bg-indigo-1 text-weight-medium rounded-borders"
        dense
      >
        <div class="q-gutter-y-sm q-pb-md q-pa-md">
          <q-input
            v-bind="attr.input.basic"
            v-model="form.brand"
            label="Marca"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.description"
            label="Descrição do produto"
            autogrow
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.code_bar"
            label="Código de barras"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.code_internal"
            label="Código interno"
          />
        </div>
      </q-expansion-item>

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.active"
        label="Produto ativo"
        class="checkbox-fix"
      />

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
    </q-page>
  </q-form>

  <q-dialog
    v-model="showStockForm"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-card-section class="q-ma-none q-pb-none q-pt-sm q-px-md">
        <div class="text-h6">{{ stockFormTitle }}</div>
      </q-card-section>

      <q-card-section class="q-ma-none q-pa-none">
        <q-input
          v-bind="attr.input.basic"
          v-model="stockForm.amount"
          class="q-pa-md"
          label="Quantidade"
          mask="#"
          fill-mask="0"
          reverse-fill-mask
          autofocus
        />
      </q-card-section>

      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          v-close-popup
          class="text-dark"
          flat
          no-caps
          label="Cancelar"
        />
        <q-btn
          v-close-popup
          :class="stockFormColor"
          flat
          no-caps
          :label="stockFormAction"
          @click="updateStockAmount"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-form>
    <div class="shadow-8"></div>
  </q-form>
</template>
