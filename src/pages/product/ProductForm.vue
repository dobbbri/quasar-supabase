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
import { useStockStore } from 'src/stores/stockStore';

const router = useRouter();
const route = useRoute();
const store = useSettingsStore();
const stockStore = useStockStore();

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

const priceExpanded = ref(true);
const stockExpanded = ref(false);
const imageExpanded = ref(false);
const detailExpanded = ref(false);

const isEditMode = computed(() => (route.params.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleSelectImage = () => file.value.pickFiles();

const loadImage = () => {
  if (image.value) {
    newImage.value = URL.createObjectURL(image.value);
  }
};

// const updateStock = () => {
//   form.value.has_stock_control = stockStore.product.isAutomatic;
//   form.value.stock_amount = stockStore.product.newAmount;
//   form.value.stock_minimum_amount = stockStore.product.minimumAmount;
// };

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
      const forceUpdate = '?t=' + new Date().getTime();
      newImage.value = getProductImageURL(form.value.image_name) + forceUpdate;
      imageExpanded.value = true;
    }
    detailExpanded.value = true;
    stockExpanded.value = form.value.has_stock_control;
    //
    stockStore.productAmount = form.value.stock_amount;
    stockStore.productMinimumAmount = form.value.stock_minimum_amount;
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
      v-bind="attr.lineSpacing"
    >
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
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome do produto deve ser informado!"
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
      >
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.abbr }}</q-item-label>
              <q-item-label
                style="magin-top: -3px"
                caption
                >{{ scope.opt.name }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="priceExpanded"
        label="Custo e lucro"
      >
        <div v-bind="attr.lineSpacing">
          <q-input
            v-bind="attr.input.basic"
            v-model="form.price_to_buy"
            label="Preço de custo"
            prefix="R$"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            :rules="[(val) => !!val]"
            error-message="O preço de custo do produto deve ser informado"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="price_profit"
            label="lucro"
            suffix="%"
            mask="#"
            fill-mask="0"
            reverse-fill-mask
            @click="calculateProfit()"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="price_markup"
            label="Markup"
            suffix="%"
            mask="#"
            fill-mask="0"
            reverse-fill-mask
          />
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="stockExpanded"
        label="Estoque"
      >
        <div v-bind="attr.lineSpacing">
          <q-checkbox
            v-bind="attr.input.basic"
            v-model="form.has_stock_control"
            label="Contolar quantidade em estoque"
          />

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
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="detailExpanded"
        label="Avançado"
      >
        <div v-bind="attr.lineSpacing">
          <q-file
            ref="file"
            v-model="image"
            class="hidden"
            accept="image/*"
            @update:model-value="loadImage()"
          />
          <div style="max-height: 200px; max-width: 200px">
            <q-img
              loading="lazy"
              :src="newImage"
              fit="cover"
              style="max-height: 200px; max-width: 200px"
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
        </div>
      </q-expansion-item>

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.active"
        label="Produto ativo"
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
</template>
