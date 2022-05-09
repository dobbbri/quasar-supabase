<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useMeasureUnits, useNameSearch, useTools, useDefaults } from 'src/composables'
import { PageHeader } from 'src/components'

const router = useRouter()
const $q = useQuasar()

const documents = ref([])

const { loading, getMeasureUnits } = useMeasureUnits()
const { searchQuery, matchingSearchQuery: measureUnits } = useNameSearch(documents)
const { notify } = useTools()
const { attr, fmt } = useDefaults()

const handleEditMeasureUnit = (measureUnit) => {
  router.push({
    name: 'measure-unit-form',
    params: { id: measureUnit.id }
  })
}

const handleGetMeasureUnits = async () => {
  try {
    documents.value = await getMeasureUnits('id, name, abbreviation, inactive')
  } catch (error) {
    notify.error('Erro ao obter as unidade de medidas.', error)
  }
}

onMounted(() => handleGetMeasureUnits())
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>Unidade de medidas</template>
      <template #right>
        <q-btn
          v-if="!$q.platform.is.mobile"
          v-bind="attr.btn.icon"
          icon="add"
          unelevated
          :loading="loading.add.value"
          :disable="loading.disable.value"
          :to="{ name: 'measure-unit-form' }"
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
      bordered
      separator
      class="bg-white rounded-borders q-mt-sm"
    >
      <q-item
        v-for="(measureUnit, index) in measureUnits"
        :key="index"
        clickable
        @click="handleEditMeasureUnit(measureUnit)"
      >
        <q-item-section>
          <q-item-label class="text-subtitle2">
            {{ measureUnit.name }} - {{ measureUnit.abbreviation }}
            <q-badge
              v-if="measureUnit.inactive"
              outline
              class="bg-red text-white text-weight-bold"
              :label="fmt.inactive(measureUnit.inactive)"
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
        :to="{ name: 'measure-unit-form' }"
      >
        <q-tooltip>Adicionar</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>
