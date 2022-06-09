<script setup>
import { ref, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useCustomers, useTools, useDefaults } from 'src/composables';
import { PageHeader, PageFooter } from 'src/components';
import { useSettingsStore } from 'src/stores/settingsStore';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const store = useSettingsStore();

const { loading, getCustomer, addCustomer, editCustomer, removeCustomer } =
  useCustomers();
const { confirm, notify } = useTools();
const { attr } = useDefaults();

const isEditMode = computed(() => (route.params.id ? true : false));
const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));
const mask = ref('(##)####-#####');
const setMask = (e) => {
  mask.value = e.target.value.length > 13 ? '(##)#####-####' : '(##)####-#####';
};
const optionsDocumentTypes = ref([]);
const emailExpanded = ref(true);
const adressExpanded = ref(false);
const detailsExpanded = ref(false);

const optionsPerson = ref([
  { label: 'Pessoa Física', value: true },
  { label: 'Pessoa Juríca', value: false }
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
  optionsDocumentTypes.value = store.documentTypes;
  if (isEditMode.value) handleGetCustomer();
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
          icon="sym_r_delete"
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

    <q-page
      padding
      v-bind="attr.lineSpacing"
    >
      <q-input
        v-bind="attr.input.basic"
        v-model="form.name"
        label="Nome"
        :rules="[(val) => val && val.length > 3]"
        error-message="O nome do cliente deve ser informado!"
      />

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="emailExpanded"
        label="Telefones e Email"
      >
        <div v-bind="attr.lineSpacing">
          <div class="line row">
            <div class="line col">
              <q-input
                v-bind="attr.input.basic"
                v-model="form.phone_1"
                label="Celular/Whatsapp"
                type="tel"
                :mask="mask"
                :rules="[(val) => !!val]"
                error-message="O telefone do cliente deve ser informado!"
                @keyup="setMask"
              />
            </div>

            <div class="col-2 text-right">
              <q-checkbox
                v-model="form.phone_1_has_whatsapp"
                checked-icon="whatsapp"
                unchecked-icon="whatsapp"
                color="green"
                class="only-image"
                size="xl"
              >
                <q-tooltip>Possui whatsapp</q-tooltip>
              </q-checkbox>
            </div>
          </div>

          <q-input
            v-bind="attr.input.basic"
            v-model="form.phone_2"
            label="Celular/Telefone fixo"
            type="tel"
            :mask="mask"
            @keyup="setMask"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.email"
            label="Email"
          />
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="adressExpanded"
        label="Endereço"
      >
        <div v-bind="attr.lineSpacing">
          <q-input
            v-bind="attr.input.basic"
            v-model="form.zip_code"
            mask="#####-###"
            label="CEP"
            @blur="handleFindCEP"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.street"
            label="Endereço, Número"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.district"
            label="Bairro"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.city"
            label="Cidade"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.state"
            mask="AA"
            label="UF(estado)"
          />
        </div>
      </q-expansion-item>

      <q-expansion-item
        v-bind="attr.expansion"
        v-model="detailsExpanded"
        label="Detalhes"
      >
        <q-option-group
          v-bind="attr.input.basic"
          v-model="form.is_legal_entity"
          :options="optionsPerson"
          inline
        />

        <div v-bind="attr.lineSpacing">
          <q-input
            v-bind="attr.input.basic"
            v-model="form.document_number"
            label="CPF/CNPJ"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.notes"
            label="Anotações do cliente"
            autogrow
          />
        </div>
      </q-expansion-item>

      <q-checkbox
        v-bind="attr.input.basic"
        v-model="form.active"
        label="Ativo"
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
