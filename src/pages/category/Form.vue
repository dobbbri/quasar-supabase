<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { PageHeader } from 'src/components'
import { useCategories, useNotify, useDefaults } from 'src/composables'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const { loading, getCategory, addCategory, editCategory, removeCategory } = useCategories()
const { notify } = useNotify()
const { attr, cfg } = useDefaults()

const isUpdate = computed(() => (route.params.id ? true : false))
const title = computed(() => (isUpdate.value ? 'Alterar' : 'Adicionar'))

const form = ref({
  name: '',
  inactive: false
})

const handleSubmit = async () => {
  try {
    if (isUpdate.value) {
      await editCategory(form.value)
    } else {
      await addCategory(form.value)
    }
    notify.success(`Categoria ${isUpdate.value ? 'alterada' : 'adicionada'}.`)
    router.push({ name: 'category-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} a categoria.`, error)
  }
}

const handleRemoveCategory = async (category) => {
  cfg.dialog.delete.message = `Confirme a exclusão da categoria: ${category.name}?`
  try {
    $q.dialog(cfg.dialog.delete).onOk(async () => {
      await removeCategory(category.id)
      notify.success('Categoria removida.')
      router.push({ name: 'category-list' })
    })
  } catch (error) {
    notify.error('Erro ao remover a categoria', error)
  }
}

const handleGetCategory = async () => {
  try {
    form.value = await getCategory(route.params.id, 'id, name, inactive')
  } catch (error) {
    notify.error('Erro ao obter a categoria.', error)
  }
}

onMounted(() => {
  if (isUpdate.value) handleGetCategory()
})
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>{{ title + ' categoria' }}</template>
      <template #buttons-right>
        <q-btn
          v-if="isUpdate"
          v-bind="attr.btn.icon"
          icon="delete_forever"
          class="bg-white text-red"
          :loading="loading.remove.value"
          :disable="loading.disable.value"
          @click="handleRemoveCategory(form)"
        >
          <q-tooltip>Excluir</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-form
      style="margin-top: 51px"
      class="q-gutter-y-md q-pa-md bg-white rounded-borders"
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

      <div class="row">
        <q-btn
          label="Cancelar"
          color="primary"
          class="col"
          rounded
          flat
          :disable="loading.disable.value"
          :to="{ name: 'category-list' }"
        />

        <q-space class="q-ml-md" />

        <q-btn
          label="Gravar"
          color="primary"
          class="col"
          rounded
          :loading="isUpdate ? loading.edit.value : loading.add.value"
          :disable="loading.disable.value"
          type="submit"
        />
      </div>
    </q-form>
  </q-page>
</template>
