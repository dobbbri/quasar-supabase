<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useServices, useTools, useStore, useData } from 'src/composables';

const router = useRouter();

const { measureUnits } = useData();
const { state, isFromTabMenu } = useStore();
const { loading, service, addService, editService } = useServices();
const { notify } = useTools();

const isEditMode = computed(() => (service.value && service.value.id ? true : false));

const title = computed(() => (isEditMode.value ? 'Alterar' : 'Adicionar'));

const handleBackTo = () => {
  if (state.value.from.form1) {
    router.push({ name: state.value.from.form1 });
  } else if (isFromTabMenu.value) {
    router.push({ name: 'service-list' });
  } else {
    router.push({ name: state.value.from.menu });
  }
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

        <expansion-item :fake="true" label="Preço">
          <money-input v-model="service.unit_price" label="Preço de venda" />

          <select-options
            v-model="service.measure_unit"
            label="Unidade de medida"
            :options="measureUnits"
            :show-id="true"
            :option-disable="(opt) => (Object(opt) === opt ? opt.active === false : false)"
          />
        </expansion-item>

        <expansion-item label="Outros Detalhes">
          <text-input v-model="service.code_bar" label="Código de barras" />
        </expansion-item>
      </page-body>
    </q-form>
  </page>
</template>
