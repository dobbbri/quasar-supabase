<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useTools, useDefaults } from 'src/composables';
import { PageHeader, PageFooter } from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

const router = useRouter();
const route = useRoute();
const store = useSettingsStore();

const { loading, getCustomer, addCustomer, editCustomer, removeCustomer } = useCustomers();
const { confirm, notify } = useTools();
const { attr } = useDefaults();

const isEditMode = computed(() => (route.params.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));
const mask = ref('(##)####-#####');
const setMask = (e) => {
  mask.value = e.target.value.length > 13 ? '(##)#####-####' : '(##)####-#####';
};
const optionsDocumentTypes = ref([]);

const form = ref({
  name: '',
  phone_1: '',
  phone_2: '',
  document_type: 'CI',
  document_number: '',
  email: '',
  notes: '',
  active: true
});

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editCustomer(form.value);
    } else {
      await addCustomer(form.value);
    }
    notify.success(`Cliente ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'customer-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o cliente.`, error);
  }
};

const handleRemoveCustomer = async (customer) => {
  try {
    confirm.delete(`do cliente: ${customer.name}`).onOk(async () => {
      await removeCustomer(customer.id);
      notify.success('Cliente excluido.');
      router.push({ name: 'customer-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir o cliente', error);
  }
};

const handleGetCustomer = async () => {
  try {
    form.value = await getCustomer(route.params.id);
  } catch (error) {
    notify.error('Erro ao obter o cliente.', error);
  }
};

onMounted(() => {
  optionsDocumentTypes.value = store.documentTypes;
  if (isEditMode.value) handleGetCustomer();
});
</script>

<template>
  <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
    <page-header>
      <template #left>
        <q-btn
          v-bind="attr.btn.icon"
          icon="arrow_back_ios_new"
          flat
          :to="{ name: 'customer-list' }"
        >
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
      </template>
      <template #title>{{ title + ' cliente' }}</template>
      <template #right>
        <q-btn
          v-if="isEditMode"
          v-bind="attr.btn.icon"
          icon="delete_forever"
          color="negative"
          unelevated
          :loading="loading.remove.value"
          :disable="loading.disable.value"
          @click="handleRemoveCustomer(form)"
        >
          <q-tooltip>Excluir</q-tooltip>
        </q-btn>
      </template>
    </page-header>

    <q-page padding class="q-gutter-y-sm">
      <q-input
        v-bind="attr.input.basic"
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome do cliente deve ser informado!"
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.phone_1"
        label="Telefone"
        type="tel"
        :mask="mask"
        :rules="[(val) => !!val]"
        error-message="O telefone do cliente deve ser informado!"
        @keyup="setMask"
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.phone_2"
        label="Telefone"
        type="tel"
        :mask="mask"
        @keyup="setMask"
      />

      <q-select
        v-bind="attr.input.basic"
        v-model="form.document_type"
        label="Tipo de documento"
        :options="optionsDocumentTypes"
        option-value="abbr"
        option-label="name"
        :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
        emit-value
        map-options
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.document_number"
        label="Número do documento"
      />

      <q-input
        v-bind="attr.input.basic"
        v-model="form.notes"
        label="informações do cliente"
        autogrow
      />

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.active"
        label="Ativo"
        class="checkbox-fix"
      />

      <page-footer>
        <q-btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          outline
          class="col-4 bg-white"
          :disable="loading.disable.value"
          :to="{ name: 'customer-list' }"
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
