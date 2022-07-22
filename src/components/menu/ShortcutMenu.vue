<script setup>
import { useRouter } from 'vue-router';
import { useCustomers, useCustomersAddresses, useOrders, useActive } from 'src/composables';
import { ExpansionItem, BtnBig } from 'src/components';

const router = useRouter();
const { clearCustomer } = useCustomers();
const { clearAddress } = useCustomersAddresses();
const { clearOrder } = useOrders();
const { active, clearActive } = useActive();

const shortcutsMenu = [
  { title: 'Adicionar Pedido', icon: 'post_add', color: 'blue', path: 'order-form' },
  { title: 'Adicionar Cliente', icon: 'person_add', color: 'orange', path: 'customer-form' },
  { title: 'Emitir Recibo', icon: 'receipt_long', color: 'grey', path: 'print-receipt' },
  { title: 'Lançar Recebimentos', icon: 'add_circle', color: 'green', path: 'revenue-form' },
  { title: 'Lançar Custos', icon: 'do_not_disturb_on', color: 'red', path: 'cost-form' },
  { title: 'Agendar Compromisso', icon: 'more_time', color: 'red', path: 'appointment-form' },
  { title: 'Catalogo de Serviços', icon: 'design_services', color: 'purple', path: 'service-list' },
  { title: 'Catalogo de Produtos', icon: 'inventory_2', color: 'purple', path: 'product-list' }
];

const open = (path) => {
  clearActive();
  active.value.formName = path;

  if (path == 'order-form') {
    clearOrder();
  } else if (path == 'customer-form') {
    clearCustomer();
    clearAddress();
  }

  router.push({ name: path, params: { backTo: 'main-menu' } });
};
</script>

<template>
  <div>
    <expansion-item label="Atalhos pricipais" default-opened>
      <div class="row q-gutter-y-md">
        <btn-big :item="shortcutsMenu[0]" class="col-12" @click="open(shortcutsMenu[0].path)" />
        <btn-big :item="shortcutsMenu[1]" class="col-12" @click="open(shortcutsMenu[1].path)" />
      </div>
    </expansion-item>

    <expansion-item label="Atalhos" default-opened group="shortcuts">
      <div class="row q-gutter-md">
        <btn-big :item="shortcutsMenu[2]" class="col" @click="open(shortcutsMenu[2].path)" />
        <btn-big :item="shortcutsMenu[3]" class="col" @click="open(shortcutsMenu[3].path)" />
        <btn-big :item="shortcutsMenu[4]" class="col" @click="open(shortcutsMenu[4].path)" />
      </div>

      <div class="row q-gutter-x-md q-mt-md">
        <btn-big :item="shortcutsMenu[5]" class="col" @click="open(shortcutsMenu[5].path)" />
        <btn-big :item="shortcutsMenu[6]" class="col" @click="open(shortcutsMenu[6].path)" />
        <btn-big :item="shortcutsMenu[7]" class="col" @click="open(shortcutsMenu[7].path)" />
      </div>
    </expansion-item>
  </div>
</template>
