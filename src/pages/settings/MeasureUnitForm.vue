<script setup>
import { useRouter } from 'vue-router'
import { useUsersSettings, useTools, useDefaults, useData } from 'src/composables'

const router = useRouter()

const { settingId, measureUnits, toJSON } = useData()
const { loading, editSettings } = useUsersSettings()
const { notify } = useTools()
const { attr } = useDefaults()

const handleSubmit = async () => {
  try {
    await editSettings({
      id: settingId.value,
      measure_units: toJSON(measureUnits.value)
    })
    notify.success('Unidades de medidas gravada.')
    router.push({ name: 'settings-form' })
  } catch (error) {
    notify.error(`Erro ao alterar as unidades de medidas.`, error)
  }
}
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'settings-form' }" />
        </template>
        <template #title>Alterar Unidades</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <q-banner v-bind="attr.banner">
          Como você mede os produtos/serviços para definir preço.
        </q-banner>

        <q-list separator style="margin-top: -10px">
          <q-item v-for="(measureUnit, index) in measureUnits" :key="index" class="q-pa-none">
            <q-item-section>
              <q-item-label v-if="measureUnit.group" class="text-h6 q-mt-lg">
                {{ measureUnit.group }}
              </q-item-label>
              <q-item-label class="text-body2" style="line-height: 12px !important">
                <q-checkbox
                  v-bind="attr.input.basic"
                  :id="index"
                  v-model="measureUnit.active"
                  style="white-space: pre-wrap; line-height: 15px"
                  :label="`${measureUnit.id} \n${measureUnit.name}`"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </page-body>
    </q-form>
  </page>
</template>
