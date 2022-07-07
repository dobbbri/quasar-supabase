<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useCustomersAddresses, useTools } from 'src/composables';
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
  BtnSave
} from 'src/components';
import { useUsersSettingsStore } from 'src/stores/settingsStore';

const store = useUsersSettingsStore();
const optionsPerson = store.personTypes;

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const { loading, getCustomer, addCustomer, editCustomer } = useCustomers();
const { getAddresses, addAddresses, editAddresses } = useCustomersAddresses();
const { notify } = useTools();

const isEditMode = computed(() => (route.params.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const form = ref({
  name: '',
  is_legal_entity: false,
  email: '',
  phone_1: '',
  phone_1_has_whatsapp: false,
  phone_2: '',
  document_number: '',
  notes: '',
  active: true
});

const formAddress = ref({
  id: 0,
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zip_code: ''
});

const handleFindCEP = () => {
  if (!formAddress.value.zip_code) return;
  $q.loading.show();

  const url = `https://brasilapi.com.br/api/cep/v1/${formAddress.value.zip_code}`;
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
      formAddress.value.street = data.street;
      formAddress.value.neighborhood = data.neighborhood;
      formAddress.value.state = data.state;
      formAddress.value.city = data.city;
    });
  $q.loading.hide();
};

const hasAddress = computed(() => {
  if (
    formAddress.value.street ||
    formAddress.value.number ||
    formAddress.value.complement ||
    formAddress.value.neighborhood ||
    formAddress.value.city ||
    formAddress.value.state ||
    formAddress.value.zip_code
  ) {
    return true;
  }
  return false;
});

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      const data = await editCustomer(form.value);
      if (hasAddress.value) {
        if (formAddress.value.id > 0) {
          await editAddresses(formAddress.value);
        } else {
          formAddress.value.id = data[0].id;
          await addAddresses(formAddress.value);
        }
      }
    } else {
      const data = await addCustomer(form.value);
      if (hasAddress.value) {
        formAddress.value.id = data[0].id;
        await addAddresses(formAddress.value);
      }
    }
    notify.success(`Cliente ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'customer-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o cliente.`, error);
  }
};

const handleBackTo = () => {
  if (route.params.id) {
    router.push({ name: 'customer-view', params: { id: route.params.id } });
  } else if (route.params.backTo) {
    router.push({ name: 'index' });
  } else {
    router.push({ name: 'customer-list' });
  }
};

const handleGetCustomer = async () => {
  try {
    const data = await getCustomer(route.params.id);
    form.value = data[0];
    const data2 = await getAddresses(form.value.id);
    if (data2) formAddress.value = data2[0];
  } catch (error) {
    notify.error('Erro ao obter o cliente.', error);
  }
};

onMounted(async () => {
  if (isEditMode.value) await handleGetCustomer();
});
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back @click="handleBackTo()" />
        </template>
        <template #title>{{ title + ' Cliente' }}</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="form.name"
          label="Nome do cliente"
          :rules="[(val) => val && val.length > 3]"
          error-message="O nome do cliente deve ser informado!"
        />

        <expansion-item default-opened group="person" label="Tipo de Pessoa">
          <radio-options v-model="form.is_legal_entity" :options="optionsPerson" />
        </expansion-item>

        <expansion-item default-opened label="Telefones e Email">
          <text-input v-model="form.email" label="Email" />

          <div class="row fit justify-between">
            <phone-input
              v-model="form.phone_1"
              label="Celular/Whatsapp"
              class="col-10"
              :rules="[(val) => !!val]"
              error-message="O telefone do cliente deve ser informado!"
            />

            <checkbox-icon
              v-model="form.phone_1_has_whatsapp"
              icon="whatsapp"
              color="green"
              class="col-1"
              :tooltip="form.phone_1_has_whatsapp ? 'Possui Whatsapp' : 'Não possui Whatsapp'"
            />
          </div>

          <phone-input v-model="form.phone_2" label="Celular/Telefone fixo" />
        </expansion-item>

        <expansion-item label="Endereço">
          <text-input
            v-model="formAddress.zip_code"
            mask="#####-###"
            label="CEP"
            @blur="handleFindCEP"
          />
          <text-input v-model="formAddress.street" label="Endereço" />
          <text-input v-model="formAddress.number" label="Número" />
          <text-input v-model="formAddress.complement" label="Complemento" />
          <text-input v-model="formAddress.neighborhood" label="Bairro" />
          <text-input v-model="formAddress.city" label="Cidade" />
          <text-input v-model="formAddress.state" mask="AA" label="UF(estado)" />
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
