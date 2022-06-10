<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCategories, useTools, useDefaults } from 'src/composables';
import { PageHeader, PageFooter, TextInput, CheckBox } from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getCategory, addCategory, editCategory, removeCategory } =
  useCategories();
const { confirm, notify } = useTools();
const { attr } = useDefaults();

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
    notify.success(
      `Categoria ${isEditMode.value ? 'alterada' : 'adicionada'}.`
    );
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
  <q-form
    v-bind="attr.form"
    @submit.prevent="handleSubmit"
  >
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          icon="sym_r_arrow_back_ios_new"
          flat
          :to="{ name: 'category-list' }"
        >
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
      </template>
      <template #title>{{ title + ' categoria' }}</template>
      <template #right>
        <q-btn
          v-if="isEditMode"
          v-bind="attr.btn.icon"
          icon="sym_r_delete"
          color="negative"
          unelevated
          :loading="loading.remove.value"
          :disable="loading.disable.value"
          @click="handleRemoveCategory(form)"
        >
          <q-tooltip>Excluir</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-page
      padding
      v-bind="attr.lineSpacing"
    >
      <text-input
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome da categoria deve ser informado!"
      />

      <check-box
        v-model="form.active"
        label="Categoria Ativa"
      />

      <page-footer>
        <q-btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          outline
          class="col-4 bg-white"
          :disable="loading.disable.value"
          :to="{ name: 'category-list' }"
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
    </q-page>
  </q-form>
</template>
