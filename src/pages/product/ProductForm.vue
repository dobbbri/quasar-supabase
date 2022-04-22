<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProducts, useTools, useDefaults } from 'src/composables'
import { PageHeader, PageFooter, Btn } from 'src/components'

const router = useRouter()
const route = useRoute()

const { loading, getProduct, addProduct, editProduct, removeProduct } = useProducts()
const { confirm, notify } = useTools()
const { attr } = useDefaults()

const isUpdate = computed(() => (route.params.id ? true : false))
const title = computed(() => (isUpdate.value ? 'Alterar' : 'Adicionar'))

const form = ref({
  image_url: '',
  name: '',
  category_id: '',
  stock_is_automatic: false,
  stock_quantity: 0,
  stock_quantity_minimum: 0,
  unit_sale_type: 'UN',
  price_to_buy: 0,
  price_to_sell: 0,
  code_bar: '',
  code_internal: '',
  description: ''
})

const handleSubmit = async () => {
  try {
    if (isUpdate.value) {
      await editProduct(form.value)
    } else {
      await addProduct(form.value)
    }
    notify.success(`Produto ${isUpdate.value ? 'alterado' : 'adicionado'}.`)
    router.push({ name: 'product-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o produto.`, error)
  }
}

const handleRemoveProduct = async (product) => {
  try {
    confirm.delete(`do produto: ${product.name}`).onOk(async () => {
      await removeProduct(product.id)
      notify.success('Produto excluida.')
      router.push({ name: 'product-list' })
    })
  } catch (error) {
    notify.error('Erro ao remover o produto', error)
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
  if (isUpdate.value) handleGetProduct()
})
</script>

<template>
  <q-page padding>
    <page-header>
      <template #left>
        <btn
          v-bind="attr.btn.icon"
          color="primary"
          icon="chevron_left"
          flat
          :to="{ name: 'product-list' }"
        />
      </template>
      <template #title>{{ title + ' produto' }}</template>
      <template #right>
        <btn
          v-if="isUpdate"
          v-bind="attr.btn.icon"
          icon="delete_forever"
          color="negative"
          unelevated
          tooltip="Excluir"
          :loading="loading.remove.value"
          :disable="loading.disable.value"
          @click="handleRemoveProduct(form)"
        />
      </template>
    </page-header>

    <q-form
      class="q-gutter-y-md q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
      @submit.prevent="handleSubmit"
    >
      <q-input
        label="Nome"
        v-model="form.name"
        :rules="[(val) => (val && val.length > 3)]"
        error-message="O nome do produto deve ser preenchido!"
      />

      <q-checkbox
        label="Utilizar estoque automático"
        color="negative"
        v-model="form.stock_is_automatic"
      />

      <page-footer>
        <btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          outline
          class="col-4 bg-white"
          :disable="loading.disable.value"
          :to="{ name: 'product-list' }"
        />

        <q-space />

        <btn
          v-bind="attr.btn.basic"
          label="Gravar"
          unelevated
          class="col-4"
          :loading="isUpdate ? loading.edit.value : loading.add.value"
          :disable="loading.disable.value"
          type="submit"
        />
      </page-footer>
    </q-form>
  </q-page>
</template>