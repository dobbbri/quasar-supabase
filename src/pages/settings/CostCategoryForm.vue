<script setup>
import { useRouter } from 'vue-router';
import { useUsersSettings, useTools, useDefaults, useData } from 'src/composables';

const router = useRouter();

const { settingId, costCategories, toJSON } = useData();
const { loading, editSettings } = useUsersSettings();
const { notify } = useTools();
const { attr } = useDefaults();

const handleSubmit = async () => {
  try {
    await editSettings({
      id: settingId.value,
      cost_category: toJSON(costCategories.value)
    });
    notify.success('Categorias de custo gravada.');
    router.push({ name: 'settings-form' });
  } catch (error) {
    notify.error(`Erro ao alterar as categorias de custo.`, error);
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'settings-form' }" />
        </template>
        <template #title>Alterar Categorias</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <q-banner v-bind="attr.banner">Organize as finanças do seu negócio</q-banner>

        <q-list separator>
          <q-item v-for="(costCategory, index) in costCategories" :key="index" class="q-pa-none">
            <q-item-section>
              <q-item-label class="text-subtitle2">
                <q-checkbox
                  v-bind="attr.input.basic"
                  :id="index"
                  v-model="costCategory.active"
                  :label="costCategory.name"
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
