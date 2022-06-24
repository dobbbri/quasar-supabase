<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCategories, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  CheckBox,
  BtnBack,
  BtnDelete,
  BtnSave
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getCategory, addCategory, editCategory, removeCategory } = useCategories();
const { confirm, notify } = useTools();

const isEditMode = computed(() => (route.params.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const form = ref({
  name: '',
  active: true
});

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editCategory(form.value);
    } else {
      await addCategory(form.value);
    }
    notify.success(`Categoria ${isEditMode.value ? 'alterada' : 'adicionada'}.`);
    router.push({ name: 'category-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} a categoria.`, error);
  }
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
    <q-form readonly @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'category-list' }" />
        </template>
        <template #title>{{ title + ' Categoria' }}</template>
        <template #right>
          <btn-delete
            v-if="isEditMode"
            :loading="loading.remove.value"
            :disable="loading.disable.value"
            @click="handleRemoveCategory(form)"
          />
          <btn-save
            :loading="isEditMode ? loading.edit.value : loading.add.value"
            :disable="loading.disable.value"
            type="submit"
          />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="form.name"
          label="Nome"
          :rules="[(val) => val && val.length > 3]"
          error-message="O nome da categoria deve ser informado!"
        />

        <check-box
          v-model="form.active"
          :label="form.active ? 'Categoria Ativa' : 'Categoria Desativada'"
        />
      </page-body>
    </q-form>
  </page>
</template>
