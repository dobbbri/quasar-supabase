<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCategories, useNameSearch, useNotify, useDefaults } from 'src/composables'
import { PageHeader } from 'src/components'

const router = useRouter()
const $q = useQuasar()

const documents = ref([])
const { searchQuery, matchingSearchQuery: categories } = useNameSearch(documents)
const { loading, getCategories } = useCategories()
const { notify } = useNotify()
const { attr } = useDefaults()

const handleListCategories = async () => {
  try {
    documents.value = await getCategories('id, name, inactive')
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
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          color="primary"
          icon="add"
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'category-form' }"
        >
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-input
      v-model="searchQuery"
      placeholder="Digite para pesquisar"
      clearable
      dense
      rounded
      autofocus
      outlined
      bg-color="white"
      color="primary"
      type="search"
      class="q-px-md"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-inner-loading
      :showing="loading.list.value"
      color="primary"
      label="obtendo registros..."
    />

    <q-list
      v-if="!loading.list.value"
      bordered
      separator
      class="bg-white rounded-borders q-mt-sm"
    >
      <q-item
        v-for="(category, index) in categories"
        :key="index"
        @click="handleEditCategory(category)"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>
            {{ category.name }}
            <q-badge
              v-if="category.inactive"
              color="negative"
              label="desativado"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

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
