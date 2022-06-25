<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  PhoneInput,
  CheckBox,
  CheckboxIcon,
  TextareaInput,
  RadioOptions,
  CpfCnpjInput,
  ExpansionItem,
  BtnBack,
  BtnRemove,
  BtnSave
} from 'src/components';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const { loading, getCustomer, addCustomer, editCustomer, removeCustomer } = useCustomers();
const { confirm, notify } = useTools();

const isEditMode = computed(() => (route.params.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const optionsPerson = ref([
  { label: 'Pessoa Física', value: false },
  { label: 'Pessoa Juríca', value: true }
]);

const form = ref({
  name: '',
  phone_1: '',
  phone_1_has_whatsapp: false,
  phone_2: '',
  email: '',
  street: '',
  district: '',
  city: '',
  state: '',
  zip_code: '',
  document_number: '',
  notes: '',
  is_legal_entity: false,
  active: true
});

const handleFindCEP = () => {
  $q.loading.show();

  const url = `https://brasilapi.com.br/api/cep/v1/${form.value.zip_code}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: { 'content-type': 'application/json;charset=utf-8' },
    timeout: 30000
  };

  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      form.value.street = data.street;
      form.value.district = data.neighborhood;
      form.value.state = data.state;
      form.value.city = data.city;
    });
  $q.loading.hide();
};

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
  if (isEditMode.value) handleGetCustomer();
});
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'customer-list' }" />
        </template>
        <template #title>{{ title + ' Cliente' }}</template>
        <template #right>
          <btn-remove
            v-if="isEditMode"
            :loading="loading.remove.value"
            :disable="loading.disable.value"
            @click="handleRemoveCustomer(form)"
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
          error-message="O nome do cliente deve ser informado!"
        />

        <expansion-item default-opened group="person" label="Tipo de Pessoa">
          <radio-options v-model="form.is_legal_entity" :options="optionsPerson" />
        </expansion-item>

        <expansion-item default-opened label="Telefones e Email">
          <div class="line row">
            <div class="line col">
              <phone-input
                v-model="form.phone_1"
                label="Celular/Whatsapp"
                :rules="[(val) => !!val]"
                error-message="O telefone do cliente deve ser informado!"
              />
            </div>

            <div class="col-2 text-right">
              <checkbox-icon
                v-model="form.phone_1_has_whatsapp"
                icon="whatsapp"
                color="green"
                :tooltip="form.phone_1_has_whatsapp ? 'Possui Whatsapp' : 'Não possui Whatsapp'"
              />
            </div>
          </div>

          <text-input v-model="form.email" label="Email" />

          <phone-input v-model="form.phone_2" label="Celular/Telefone fixo" />
        </expansion-item>

        <expansion-item label="Endereço">
          <text-input v-model="form.zip_code" mask="#####-###" label="CEP" @blur="handleFindCEP" />
          <text-input v-model="form.street" label="Endereço, Número" />
          <text-input v-model="form.district" label="Bairro" />
          <text-input v-model="form.city" label="Cidade" />
          <text-input v-model="form.state" mask="AA" label="UF(estado)" />
        </expansion-item>

        <expansion-item label="Avançado">
          <cpf-cnpj-input v-model="form.document_number" :is-legal-entity="form.is_legal_entity" />
          <textarea-input v-model="form.notes" label="Anotações" />
        </expansion-item>

        <check-box
          v-model="form.active"
          :label="form.active ? 'Cliente Ativo' : 'Cliente Desativado'"
        />
      </page-body>
    </q-form>
  </page>
</template>
