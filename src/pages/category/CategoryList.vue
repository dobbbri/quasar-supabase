<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCategories, useNameSearch, useTools, useDefaults } from 'src/composables'
import { PageHeader } from 'src/components'

const router = useRouter()
const $q = useQuasar()

const documents = ref([])

const { loading, getCategories } = useCategories()
const { searchQuery, matchingSearchQuery: categories } = useNameSearch(documents)
const { notify } = useTools()
const { attr, fmt } = useDefaults()

const handleEditCategory = (category) => {
  router.push({
    name: 'category-form',
    params: { id: category.id }
  })
}

const handleGetCategories = async () => {
  try {
    documents.value = await getCategories('id, name, inactive')
  } catch (error) {
    notify.error('Erro ao obter as categorias.', error)
  }
}

onMounted(() => handleGetCategories())
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Categorias</template>
      <template #right>
        <q-btn
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          icon="add"
          unelevated
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
      v-bind="attr.input.search"
      placeholder="Digite para pesquisar"
      autofocus
      class="q-px-none"
      type="text"
    >
      <template #prepend>
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
      separator
      class="q-mt-sm"
    >
      <q-item
        v-for="(category, index) in categories"
        :key="index"
        clickable
        @click="handleEditCategory(category)"
      >
        <q-item-section>
          <q-item-label class="text-subtitle2">
            {{ category.name }}
            <q-badge
              v-if="category.inactive"
              outline
              class="bg-red text-white text-weight-bold"
              :label="fmt.hideProducts(category.inactive)"
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
        v-bind="attr.btn.icon"
        icon="add"
        fab
        :loading="loading.add.value"
        :disable="loading.disable.value"
        :to="{ name: 'category-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
