<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMeasureUnits, useTools, useDefaults } from 'src/composables'
import { PageHeader, PageFooter } from 'src/components'

const router = useRouter()
const route = useRoute()

const { loading, getMeasureUnit, addMeasureUnit, editMeasureUnit, removeMeasureUnit } =
  useMeasureUnits()
const { confirm, notify } = useTools()
const { attr } = useDefaults()

const isEditMode = computed(() => (route.params.id ? true : false))
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'))

const form = ref({
  name: '',
  inactive: false
})

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editMeasureUnit(form.value)
    } else {
      await addMeasureUnit(form.value)
    }
    notify.success(`Categoria ${isEditMode.value ? 'alterada' : 'adicionada'}.`)
    router.push({ name: 'measure-unit-list' })
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} a unidade de medida.`, error)
  }
}

const handleRemoveMeasureUnit = async (measureUnit) => {
  try {
    confirm.delete(`da unidade de medida: ${measureUnit.name}`).onOk(async () => {
      await removeMeasureUnit(measureUnit.id)
      notify.success('Categoria excluida.')
      router.push({ name: 'measure-unit-list' })
    })
  } catch (error) {
    notify.error('Erro ao excluir a unidade de medida', error)
  }
}

const handleGetMeasureUnit = async () => {
  try {
    form.value = await getMeasureUnit(route.params.id)
  } catch (error) {
    notify.error('Erro ao obter a unidade de medida.', error)
  }
}

onMounted(() => {
  if (isEditMode.value) handleGetMeasureUnit()
})
</script>

<template>
  <q-page padding>
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          color="primary"
          icon="chevron_left"
          flat
          :to="{ name: 'measure-unit-list' }"
        >
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
      </template>
      <template #title>{{ title + ' unidade de medida' }}</template>
      <template #right>
        <q-btn
          v-if="isEditMode"
          v-bind="attr.btn.icon"
          icon="delete_forever"
          color="negative"
          unelevated
          :loading="loading.remove.value"
          :disable="loading.disable.value"
          @click="handleRemoveMeasureUnit(form)"
        >
          <q-tooltip>Excluir</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-form
      class="q-gutter-y-xs q-mt-xs q-px-md q-pb-md bg-white rounded-borders q-table--bordered"
      @submit.prevent="handleSubmit"
    >
      <q-input
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome da unidade de medida deve ser informado!"
      />

      <q-input
        v-model="form.abbreviation"
        label="Sigla"
        :rules="[(val) => !!val]"
        error-message="A sigla da unidade de medida deve ser informada!"
      />

      <q-checkbox
        v-model="form.inactive"
        label="Não exibir esta unidade de medida"
        color="negative"
        class="checkbox-fix"
      />

      <page-footer>
        <q-btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          outline
          class="col-4 bg-white"
          :disable="loading.disable.value"
          :to="{ name: 'measure-unit-list' }"
        />

        <q-space />

        <q-btn
          v-bind="attr.btn.basic"
          label="Gravar"
          unelevated
          class="col-4"
          :loading="isEditMode ? loading.edit.value : loading.add.value"
          :disable="loading.disable.value"
          type="submit"
        />
      </page-footer>
    </q-form>
  </q-page>
</template>
