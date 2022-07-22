<script setup>
const mainMenu = [
  { title: 'Pedidos', icon: 'list_alt', color: 'blue', path: 'order-list' },
  { title: 'Clientes', icon: 'supervisor_account', color: 'orange', path: 'customer-list' },
  { title: 'Financeiro', icon: 'analytics', color: 'green', path: 'finance' },
  { title: 'Compromissos', icon: 'calendar_month', color: 'red', path: 'appointment-list' }
];
</script>

<template>
  {{ mainMenu }}
</template>
