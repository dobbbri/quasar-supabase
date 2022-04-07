<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCategories, useNotify } from 'src/composables'
import { columnsCategory } from './table'

const $q = useQuasar()
const router = useRouter()

const { loading, getCategories, removeCategory } = useCategories()
const { notify } = useNotify()
const categories = ref([])

const handleListCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error)
  }
}

const handleEditCategory = (category) => {
  router.push({
    name: 'category-form',
    params: { id: category.id }
  })
}

const handleRemoveCategory = async (category) => {
  try {
    $q.dialog({
      title: 'Confirmação',
      message: `Escluir a categoria: ${category.name}?`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await removeCategory(category.id)
      notify.success('Categoria removida.')
      handleListCategories()
    })
  } catch (error) {
    notify.error('Erro ao remover a categoria', error)
  }
}

onMounted(() => handleListCategories())
</script>

<template>
  <q-page>
    <div class="row">
      <q-table
        :rows="categories"
        :columns="columnsCategory"
        row-key="id"
        class="col-12"
        flat
        no-data-label="Nenhum dado disponível"
        :loading="loading.list.value"
      >
        <template v-slot:top>
          <span class="text-h6">Categorias</span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Adicionar"
            color="primary"
            icon="add"
            dense
            class="q-px-sm"
            :loading="loading.add.value"
            :disable="loading.disable.value"
            :to="{ name: 'category-form' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td
            :props="props"
            class="q-gutter-x-sm"
          >
            <q-btn
              icon="edit"
              color="warning"
              dense
              :loading="loading.edit.value"
              :disable="loading.disable.value"
              @click="handleEditCategory(props.row)"
            >
              <q-tooltip>Alterar</q-tooltip>
            </q-btn>
            <q-btn
              icon="delete_forever"
              color="negative"
              dense
              :loading="loading.remove.value"
              :disable="loading.disable.value"
              @click="handleRemoveCategory(props.row)"
            >
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="add"
        color="primary"
        :loading="loading.add.value"
        :disable="loading.disable.value"
        :to="{ name: 'category-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
