<script setup>
import { useRouter } from 'vue-router'
import { useUsersSettings, useTools, useDefaults, useData } from 'src/composables'

const router = useRouter()

const { settingId, orderStatuses, toJSON } = useData()
const { loading, editSettings } = useUsersSettings()
const { notify } = useTools()
const { attr } = useDefaults()

const handleSubmit = async () => {
  try {
    await editSettings({
      id: settingId.value,
      order_status: toJSON(orderStatuses.value)
    })
    notify.success('Situações dos pedidos gravada.')
    router.push({ name: 'settings-form' })
  } catch (error) {
    notify.error(`Erro ao alterar a situações dos pedidos.`, error)
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
        <template #title>Alterar Situações</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <q-banner v-bind="attr.banner">Isto é impotante para a organição do seu negócio</q-banner>

        <q-list separator>
          <q-item v-for="(orderStatus, index) in orderStatuses" :key="index" class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-subtitle2">
                <q-checkbox
                  v-bind="attr.input.basic"
                  :id="index"
                  v-model="orderStatus.active"
                  :label="orderStatus.name"
                  class="checkbox-fix"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </page-body>
    </q-form>
  </page>
</template>
