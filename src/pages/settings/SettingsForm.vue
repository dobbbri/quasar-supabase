<script setup>
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { Page, PageHeader, PageBody, BtnBack, BtnArrow } from 'src/components';

const form = ref({
  dark_mode: false,
  has_stock_controlk: false
});
const $q = useQuasar();

watch(form.value.dark_mode, () => {
  $q.dark.set(form.value.dark_mode);
  $q.localStorage.set('darkMode', form.value.dark_mode);
});

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode');
  if (darkModeIsActive) {
    form.value.dark_mode = true;
  }
});
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'main-menu' }" />
        </template>
        <template #title>Alterar</template>
      </page-header>

      <page-body>
        <q-list class="rounded-borders">
          <q-item tag="label">
            <q-item-section>
              <q-item-label>Utilizar modo escuro</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                v-model="form.dark_mode"
                checked-icon="sym_o_dark_mode"
                unchecked-icon="sym_o_light_mode"
                val="picture"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <btn-arrow label="Unidade de Medidas" :to="{ name: 'measure-unit-form' }" />
        <btn-arrow label="Condições de Pagamento" :to="{ name: 'payment-condition-form' }" />
        <btn-arrow label="Formas de Pagamento" :to="{ name: 'payment-method-form' }" />
        <btn-arrow label="Situação do Pedido" :to="{ name: 'order-status-form' }" />
        <btn-arrow label="Categorias de Custo" :to="{ name: 'cost-category-form' }" />
      </page-body>
    </q-form>
  </page>
</template>
