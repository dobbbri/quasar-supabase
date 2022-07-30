<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useServices, useTools } from 'src/composables';

const router = useRouter();
const route = useRoute();

const { loading, service, getService, removeService } = useServices();
const { confirm, notify, fmt } = useTools();

const handleRemoveService = async () => {
  try {
    confirm.delete(`do serviço: ${service.value.name}`).onOk(async () => {
      await removeService(service.value.id);
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
    service.value = data[0];
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
            <fab-edit-action :loading="loading.value" :to="{ name: 'service-form' }" />
          </fab-menu>
        </template>
      </page-header>

      <page-body>
        <text-view :value="service.name" label="Nome do Serviço" />

        <text-view v-if="service.details" :value="service.details" label="Detalhes" />

        <text-view
          v-if="service.unit_price > 0"
          :value="fmt.currency(service.unit_price) + '/' + service.measure_unit"
          label="Preço"
        />
      </page-body>
    </q-form>
  </page>
</template>
