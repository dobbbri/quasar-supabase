<script setup>
import { ref, onMounted } from 'vue'
import { useCategories, useTools, useDefaults } from 'src/composables'

const { loading, getCategories } = useCategories()
const { notify } = useTools()
const { cfg } = useDefaults()

const categories = ref([])

const handleListCategories = async () => {
  try {
    categories.value = await getCategories('id, name, inactive')
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error)
  }
}

const formatInactive = (value) => {
  const formatted = value ? 'Desativado' : ''
  return formatted
}

const columns = [
  { name: 'nome', align: 'left', label: 'NOME', field: 'name', sortable: true },
  {
    name: 'status',
    align: 'center',
    label: 'STATUS',
    field: 'inactive',
    format: (val) => formatInactive(val),
    sortable: true
  }
]

onMounted(() => handleListCategories())
</script>

<template>
  <q-page padding>
    <q-table
      bordered
      v-bind="cfg.table"
      title="Categorias"
      :rows="categories"
      :columns="columns"
      :loading="loading.list.value"
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
    </q-table>
  </q-page>
</template>
