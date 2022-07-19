<script setup>
import { Page, PageHeader, PageBody, BtnBack, BtnArrow } from 'src/components';
</script>

<template>
  <page>
    <q-form>
      <page-header>
        <template #left>
          <btn-back :to="{ name: 'main-menu' }" />
        </template>
        <template #title>Configurações</template>
      </page-header>

      <page-body>
        <btn-arrow label="Unidade de Medidas" :to="{ name: 'measure-unit-form' }" />
        <btn-arrow label="Condições de Pagamento" :to="{ name: 'payment-condition-form' }" />
        <btn-arrow label="Formas de Pagamento" :to="{ name: 'payment-method-form' }" />
        <btn-arrow label="Situação do Pedido" :to="{ name: 'order-status-form' }" />
        <btn-arrow label="Categorias de Custo" :to="{ name: 'cost-category-form' }" />
      </page-body>
    </q-form>
  </page>
</template>
