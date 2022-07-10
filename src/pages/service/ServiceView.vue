<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useServices, useTools } from 'src/composables';
import {
  Page,
  PageHeader,
  PageBody,
  BtnBack,
  TextView,
  FabMenu,
  FabEditAction,
  FabRemoveAction
} from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, getService, removeService } = useServices();
const { confirm, notify, fmt } = useTools();

const form = ref({
  price: 0
});

const handleEditService = (service) => {
  router.push({ name: 'service-form', params: { id: service.id } });
};

const handleRemoveService = async (service) => {
  try {
    confirm.delete(`do serviço: ${service.name}`).onOk(async () => {
      await removeService(service.id);
      notify.success('Serviço excluido.');
      router.push({ name: 'service-list' });
    });
  } catch (error) {
    notify.error('Erro ao excluir o serviço', error);
  }
};

const handleGetService = async () => {
  try {
    const data = await getService(route.params.id);
    form.value = data[0];
  } catch (error) {
    notify.error('Erro ao obter o serviço.', error);
  }
};

onMounted(async () => {
  await handleGetService();
});
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'service-list' }" />
        </template>
        <template #title>Serviço</template>
        <template #right>
          <fab-menu>
            <fab-remove-action :loading="loading.value" @click="handleRemoveService(form)" />
            <fab-edit-action :loading="loading.value" @click="handleEditService(form)" />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="form.name" label="Nome do Serviço" />

        <text-view v-if="form.details" :value="form.details" label="Detalhes" />

        <text-view
          v-if="form.price > 0"
          :value="fmt.currency(form.price) + '/' + form.measure_unit"
          label="Preço"
        />
      </page-body>
    </q-form>
  </page>
</template>
