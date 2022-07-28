<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCustomers, useTools, useActive } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  PhoneInput,
  TextareaInput,
  RadioOptions,
  CpfCnpjInput,
  CepInput,
  ExpansionItem,
  BtnBack,
  BtnSave
} from 'src/components';
import { useUsersSettingsStore } from 'src/stores/settingsStore';

const store = useUsersSettingsStore();
const optionsPerson = store.personTypes;

const router = useRouter();

const { active, fromTabMenu } = useActive();
const { loading, customer, address, addCustomerAddress, editCustomerAddress } = useCustomers();
const { notify } = useTools();

const isEditMode = computed(() => (customer.value && customer.value.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (active.value.fromForm) {
    router.push({ name: active.value.fromForm });
  } else if (fromTabMenu.value) {
    router.push({ name: 'customer-list' });
  } else {
    router.push({ name: active.value.fromMenu });
  }
};

const fillAddress = (data) => {
  address.value.street = data.street;
  address.value.neighborhood = data.neighborhood;
  address.value.state = data.state;
  address.value.city = data.city;
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editCustomerAddress(customer.value, address.value);
    } else {
      await addCustomerAddress(customer.value, address.value);
    }
    notify.success(`Cliente ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'customer-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o cliente.`, error);
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

        <expansion-item :fake="true" label="Tipo de Pessoa">
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
          <cep-input v-model:cep="address.zip_code" label="CEP" @result="fillAddress" />
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
