<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useCustomersAddresses, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  PhoneInput,
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

const { loading, customer, addCustomer, editCustomer } = useCustomers();
const { address, addAddress, editAddress } = useCustomersAddresses();
const { notify } = useTools();

const isEditMode = computed(() => (customer.value && customer.value.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleFindCEP = () => {
  if (address.value && address.value.zip_code.length == 9) {
    $q.loading.show();

    const url = `https://brasilapi.com.br/api/cep/v1/${address.value.zip_code}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: { 'content-type': 'application/json;charset=utf-8' },
      timeout: 30000
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('CEP inválido!');
      })
      .then((data) => {
        address.value.street = data.street;
        address.value.neighborhood = data.neighborhood;
        address.value.state = data.state;
        address.value.city = data.city;
      })
      .catch((error) => notify.info(error.message));
    $q.loading.hide();
  }
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      const data = await editCustomer(customer.value);
      if (address.value.id > 0) {
        await editAddress(address.value);
      } else {
        address.value.id = data[0].id;
        await addAddress(address.value);
      }
    } else {
      const data = await addCustomer(customer.value);
      if (address.value.address) {
        address.value.id = data[0].id;
        await addAddress(address.value);
      }
    }
    notify.success(`Cliente ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'customer-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o cliente.`, error);
  }
};

const handleBackTo = () => {
  if (route.params.backTo) {
    router.push({ name: 'index' });
  } else {
    router.push({ name: 'customer-list' });
  }
};
</script>

<template>
  <page>
    <q-form @submit.prevent="handleSubmit">
      <page-header>
        <template #left>
          <btn-back @click="handleBackTo()" />
        </template>
        <template #title>{{ title }} Cliente</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="customer.name"
          label="Nome do cliente"
          :rules="[(val) => !!val]"
          error-message="O nome do cliente deve ser informado!"
        />

        <expansion-item default-opened group="person" label="Tipo de Pessoa">
          <radio-options v-model="customer.is_legal_entity" :options="optionsPerson" />
        </expansion-item>

        <expansion-item default-opened label="Telefones e Email">
          <div class="line row q-gutter-x-md">
            <div class="col">
              <phone-input
                v-model="customer.phone_1"
                label="Telefone"
                class="col-10"
                :rules="[(val) => !!val]"
                error-message="O telefone do cliente deve ser informado!"
              />
            </div>
            <div class="col">
              <phone-input v-model="customer.phone_2" label="Telefone" />
            </div>
          </div>
          <text-input v-model="customer.email" label="Email" />
        </expansion-item>

        <expansion-item label="Endereço">
          <text-input
            v-model="address.zip_code"
            mask="#####-###"
            label="CEP"
            @blur="handleFindCEP"
          />

          <text-input v-model="address.street" label="Endereço" />

          <div class="line row q-gutter-x-md">
            <div class="col-4">
              <text-input v-model="address.number" label="Número" />
            </div>
            <div class="col">
              <text-input v-model="address.complement" label="Complemento" />
            </div>
          </div>

          <text-input v-model="address.neighborhood" label="Bairro" />

          <div class="line row q-gutter-x-md">
            <div class="col">
              <text-input v-model="address.city" label="Cidade" />
            </div>
            <div class="col-3">
              <text-input v-model="address.state" mask="AA" label="UF(estado)" />
            </div>
          </div>
        </expansion-item>

        <expansion-item label="Outros Detalhes">
          <cpf-cnpj-input
            v-model="customer.document_number"
            :is-legal-entity="customer.is_legal_entity"
          />
          <textarea-input v-model="customer.notes" label="Anotações" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
