<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProducts, useTools, useDefaults } from 'src/composables'
import { PageHeader, PageFooter } from 'src/components'

const router = useRouter()
const route = useRoute()

const {
  loading,
  getProduct,
  addProduct,
  editProduct,
  removeProduct,
  getProductImageURL,
  addProductImage,
  editProductImage,
  removeProductImage
} = useProducts()
const { confirm, notify } = useTools()
const { attr } = useDefaults()

const isEditMode = computed(() => (route.params.id ? true : false))
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'))
const loadImage = computed((imageName) => {
  return getProductImageURL(imageName) + '?t=' + new Date().getTime()
})

const image = ref(null)
const form = ref({
  name: '',
  category_id: 1,
  stock_is_automatic: false,
  stock_quantity: 0,
  stock_quantity_minimum: 0,
  unit_sale_type: 'UN',
  price_to_buy: 0,
  price_to_sell: 0,
  code_bar: '',
  code_internal: '',
  description: '',
  image_name: null
})

const handleSubmit = async () => {
  try {
    if (form.value.image_name) {
      await editProductImage(form.value.image_name, image.value)
    } else {
      const imageName = await addProductImage('products', image.value)
      form.value.image_name = imageName
    }
    if (isEditMode.value) {
      await editProduct(form.value)
    } else {
      await addProduct(form.value)
    }
    notify.success(`Produto ${isEditMode.value ? 'alterado' : 'adicionado'}.`)
    router.push({ name: 'product-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o produto.`, error)
  }
}

const handleRemoveProduct = async (product) => {
  try {
    confirm.delete(`do produto: ${product.name}`).onOk(async () => {
      if (form.value.image_name) {
        await removeProductImage([form.value.image_name])
      }
      await removeProduct(product.id)
      notify.success('Produto excluido.')
      router.push({ name: 'product-list' })
    })
  } catch (error) {
    notify.error('Erro ao excluir o produto', error)
  }
}

const handleGetProduct = async () => {
  try {
    form.value = await getProduct(route.params.id)
  } catch (error) {
    notify.error('Erro ao obter o produto.', error)
  }
}

onMounted(() => {
  if (isEditMode.value) handleGetProduct()
})
</script>

<template>
  <q-page padding>
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          color="primary"
          icon="chevron_left"
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

    <q-form
      class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
      @submit.prevent="handleSubmit"
    >
      <q-input
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome do produto deve ser informado!"
      />

      <q-checkbox
        v-model="form.stock_is_automatic"
        label="Utilizar estoque automático"
        color="primary"
        class="checkbox-fix"
      />

      <q-img
        v-if="form.image_url && !image"
        :src="loadImage(form.image_name)"
        spinner-color="white"
        class="q-mt-md rounded-borders"
        style="height: 150px; max-height: 150px"
        :ratio="4 / 3"
      />

      <q-banner v-if="image" rounded class="text-body1 bg-blue-grey-2 q-pa-xs q-my-sm">
        A nova imagem selecionada sera exibida após gravar o produto!
      </q-banner>

      <q-file
        v-model="image"
        :label="isEditMode ? 'Selecionar nova imagem' : 'Selecionar imagem'"
        type="file"
        accept="image/*"
        class="q-mb-md"
        clearable
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
