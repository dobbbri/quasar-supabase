<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCategories, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextView,
  BtnBack,
  FabMenu,
  FabEditAction,
  FabRemoveAction
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getCategory, removeCategory } = useCategories();
const { confirm, notify } = useTools();

const isEditMode = computed(() => (route.params.id ? true : false));

const form = ref({
  name: '',
  active: true
});

const handleEditCategory = (category) => {
  router.push({ name: 'category-form', params: { id: category.id } });
};

const handleRemoveCategory = async (category) => {
  try {
    confirm.delete(`da categoria: ${category.name}`).onOk(async () => {
      await removeCategory(category.id);
      notify.success('Categoria excluida.');
      router.push({ name: 'category-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir a categoria', error);
  }
};

const handleGetCategory = async () => {
  try {
    form.value = await getCategory(route.params.id);
  } catch (error) {
    notify.error('Erro ao obter a categoria.', error);
  }
};

onMounted(() => {
  if (isEditMode.value) handleGetCategory();
});
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'category-list' }" />
        </template>
        <template #title>Categoria</template>
        <template #right>
          <fab-menu>
            <fab-remove-action
              :loading="loading.remove.value"
              :disable="loading.disable.value"
              @click="handleRemoveCategory(form)"
            />
            <fab-edit-action
              :loading="loading.edit.value"
              :disable="loading.disable.value"
              @click="handleEditCategory(form)"
            />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="form.name" label="Nome" />

        <text-view :value="form.active ? 'Categoria Ativa' : 'Categoria Desativada'" />
      </page-body>
    </q-form>
  </page>
</template>
