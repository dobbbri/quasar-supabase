<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PageHeader } from 'src/components'
import { useProducts, useNotify, useConfirm, useDefaults } from 'src/composables'

const router = useRouter()
const route = useRoute()

const { loading, getProduct, addProduct, editProduct, removeProduct } = useProducts()
const { notify } = useNotify()
const { confirm } = useConfirm()
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
      <template #title>{{ title + ' produto' }}</template>
      <template #right>
        <q-btn
          v-if="isUpdate"
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
      class="q-gutter-y-md q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
      @submit.prevent="handleSubmit"
    >
      <q-input
        label="Name"
        v-model="form.name"
        :rules="[(val) => (val && val.length > 0) || 'Name is required']"
      />

      <q-checkbox
        label="desativado"
        color="negative"
        v-model="form.inactive"
      />

      <q-footer class="bg-transparent q-pa-md">
        <div class="row">
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
            :loading="isUpdate ? loading.edit.value : loading.add.value"
            :disable="loading.disable.value"
            type="submit"
          />
        </div>
      </q-footer>
    </q-form>
  </q-page>
</template>
