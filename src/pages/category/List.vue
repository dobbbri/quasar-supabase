<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCategories, useNotify, useDefaults } from 'src/composables'
import { PageHeader } from 'src/components'
import { formatInactive } from 'src/utils'

const router = useRouter()
const $q = useQuasar()

const { loading, getCategories } = useCategories()
const { notify } = useNotify()
const { attr, cfg } = useDefaults()

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

const columns = [
  { name: 'nome', align: 'left', label: 'NOME', field: 'name', sortable: true },
  {
    name: 'status',
    align: 'center',
    label: 'STATUS',
    field: 'inactive',
    format: (val) => formatInactive(val),
    sortable: true
  },
  { name: 'actions', align: 'right', label: 'AÇÕES', field: 'actions', sortable: false }
]
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Categorias</template>
      <template #buttons-right>
        <q-btn
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          class="bg-white text-blue"
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
      bordered
      v-bind="cfg.table"
      :rows="categories"
      :columns="columns"
      :loading="loading.list.value"
      style="margin-top: 51px"
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
