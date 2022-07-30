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
        <item-btn label="Unidade de Medidas" :to="{ name: 'measure-unit-form' }" />
        <item-btn label="Condições de Pagamento" :to="{ name: 'payment-condition-form' }" />
        <item-btn label="Formas de Pagamento" :to="{ name: 'payment-method-form' }" />
        <item-btn label="Situação do Pedido" :to="{ name: 'order-status-form' }" />
        <item-btn label="Categorias de Custo" :to="{ name: 'cost-category-form' }" />
      </page-body>
    </q-form>
  </page>
</template>
