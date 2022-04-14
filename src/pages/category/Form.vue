<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { PageHeader } from 'src/components'
import { useCategories, useNotify, useAttributes } from 'src/composables'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const { loading, getCategory, addCategory, editCategory, removeCategory } = useCategories()
const { notify } = useNotify()
const { attr } = useAttributes()

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
  try {
    $q.dialog({
      message: `Confirme a exclusão?`,
      ok: { label: 'Excluir', flat: true },
      cancel: { label: 'Cancelar', flat: true },
      persistent: true
    }).onOk(async () => {
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
        color="white"
        :loading="loading.remove.value"
        :disable="loading.disable.value"
        @click="handleRemoveCategory(form)"
      >
        <q-tooltip>Excluir</q-tooltip>
      </q-btn>
    </template>
  </page-header>

    <q-form
      class="q-gutter-y-md q-pa-md bg-white rounded-corners"
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
