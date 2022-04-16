<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategories, useNotify, useAttributes } from 'src/composables'
import { tableConfig } from './table'
import PageHeader from 'src/components/PageHeader.vue'

const router = useRouter()

const { loading, getCategories } = useCategories()
const { notify } = useNotify()
const { attr } = useAttributes()

const categories = ref([])

const handleListCategories = async () => {
  try {
    categories.value = await getCategories('id, name, inactive')
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

onMounted(() => handleListCategories())
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Categorias</template>
      <template #buttons-right>
        <q-btn
          v-if="$q.platform.is.desktop"
          v-bind="attr.btn.icon"
          color="white"
          icon="add"
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'category-form' }"
        >
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-table
      style="margin-top: 51px"
      :rows="categories"
      :loading="loading.list.value"
      v-bind="tableConfig"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            v-if="props.value"
            color="negative"
            :label="props.value"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td
          :props="props"
          class="q-gutter-x-sm"
        >
          <q-btn
            icon="chevron_right"
            round
            flat
            @click="handleEditCategory(props.row)"
          >
            <q-tooltip>Alterar</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

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
