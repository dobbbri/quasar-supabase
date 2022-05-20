<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProducts, useCategories, useTools, useDefaults } from 'src/composables';
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

const isEditMode = computed(() => (route.params.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleUploadBtnClick = () => file.value.pickFiles();

const loadImage = () => {
  if (image.value) {
    return URL.createObjectURL(image.value);
  } else if (form.value.image_name) {
    const forceUpdate = '?t=' + new Date().getTime();
    const image = getProductImageURL(form.value.image_name);
    return image + forceUpdate;
  }
  return 'img/unnamed.png';
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

onMounted(() => {
  optionsMeasureUnits.value = store.measureUnits;
  handleGetCategories();
  if (isEditMode.value) handleGetProduct();
});
</script>

<template>
  <q-page padding>
    <page-header>
      <template #left>
        <q-btn v-bind="attr.btn.icon" icon="arrow_back_ios_new" flat :to="{ name: 'product-list' }">
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
      </template>
      <template #title>{{ title + ' produto' }}</template>
      <template #right>
        <q-btn
          v-if="isEditMode"
          v-bind="attr.btn.icon"
          icon="delete_forever"
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

    <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
      <div>
        <q-file ref="file" v-model="image" class="hidden" accept="image/*" />
        <div class="q-field__label no-pointer-events">Imagem/Foto</div>
        <q-card flat bordered style="height: 150px; width: 150px">
          <q-img loading="lazy" :src="loadImage()" fit="cover" spinner-color="primary">
            <div class="absolute-bottom" style="padding: 0">
              <q-btn
                flat
                class="full-width q-py-sm"
                icon="add_circle"
                label="Adicionar"
                @click="handleUploadBtnClick()"
              />
            </div>
          </q-img>
        </q-card>
      </div>

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
        :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
        map-options
        emit-value
        :rules="[(val) => !!val]"
        error-message="Uma categoria deve ser selecionada"
      >
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label :class="{ 'text-negative text-strike': !scope.opt.active }">
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
        :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
        emit-value
        map-options
        :rules="[(val) => !!val]"
        error-message="Uma unidade de medida deve ser selecionada"
      />

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.stock_is_automatic"
        label="Utilizar estoque automático"
        class="checkbox-fix"
        style="margin-bottom: -16px"
      />

      <q-input
        v-if="form.stock_is_automatic"
        v-bind="attr.input.basic"
        v-model="form.stock_amount"
        label="Quantidade"
        mask="#"
        fill-mask="0"
        reverse-fill-mask
        :rules="[(val) => !!val && val > 0]"
        error-message="A quantidade do produto deve ser informada"
      />

      <q-input
        v-if="form.stock_is_automatic"
        v-bind="attr.input.basic"
        v-model="form.stock_minimum_amount"
        label="Quantidade mínima"
        mask="#"
        fill-mask="0"
        reverse-fill-mask
        :rules="[(val) => !!val && val > 0]"
        error-message="A quantidade mínima do produto deve ser informada"
      />

      <q-input v-bind="attr.input.basic" v-model="form.brand" label="Marca" autogrow />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.description"
        label="Descrição do produto"
        autogrow
      />

      <q-input v-bind="attr.input.basic" v-model="form.code_bar" label="Código de barras" />

      <q-input v-bind="attr.input.basic" v-model="form.code_internal" label="Código interno" />

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.stock_is_automatic"
        label="Ativo"
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
    </q-form>
  </q-page>
</template>
