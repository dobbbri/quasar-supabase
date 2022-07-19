<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useServices, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  TextInput,
  MoneyInput,
  SelectOptions,
  TextareaInput,
  ExpansionItem,
  BtnBack,
  BtnSave
} from 'src/components';

const router = useRouter();

const { loading, service, addService, editService } = useServices();
const { notify } = useTools();

const optionsMeasureUnits = ref([]);

const isEditMode = computed(() => (service.value && service.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  router.push({ name: 'service-list' });
};

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await editService(service.value);
    } else {
      await addService(service.value);
    }
    notify.success(`Serviço ${isEditMode.value ? 'alterado' : 'adicionado'}.`);
    router.push({ name: 'service-list' });
  } catch (error) {
    notify.error(`Erro ao ${title.value.toLowerCase()} o serviço.`, error);
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
        <template #title>{{ title }} Serviço</template>
        <template #right>
          <btn-save :loading="loading.value" type="submit" />
        </template>
      </page-header>

      <page-body>
        <text-input
          v-model="service.name"
          label="Nome do serviço"
          :rules="[(val) => val && val.length > 0]"
          error-message="O nome do serviço deve ser informado!"
        />

        <textarea-input v-model="service.details" label="Detalhes do serviço" />

        <expansion-item default-opened group="price" label="Preço">
          <money-input
            v-model="service.price"
            label="Preço de venda"
            :rules="[(val) => Number(val.replaceAll('.', '').replaceAll(',', '.')) > 0]"
            error-message="O preço de venda do serviço deve ser informado"
          />

          <select-options
            v-model="service.measure_unit"
            label="Unidade de medida"
            :options="optionsMeasureUnits"
            :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
            :rules="[(val) => !!val]"
            error-message="Uma unidade de medida deve ser selecionada"
            :use-template="2"
          />
        </expansion-item>

        <!-- <expansion-item label="Outros Detalhes"> -->
        <!--   <text-input v-model="service.code_bar" label="Código de barras" /> -->
        <!-- </expansion-item> -->
      </page-body>
    </q-form>
  </page>
</template>
