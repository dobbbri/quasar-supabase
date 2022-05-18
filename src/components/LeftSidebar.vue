<script setup>
import { useMenuStore } from "src/stores/menuStore";

const store = useMenuStore();

const linksList = [
  { title: "Início", icon: "home", routeName: "index" },
  { title: "Categorias", icon: "category", routeName: "category-list" },
  { title: "Produtos", icon: "inventory", routeName: "product-list" },
  { title: "Configuracões", icon: "tune", routeName: "config" },
  {
    title: "Unidade de Medidas",
    icon: "scale",
    routeName: "measure-unit-form",
  },
  {
    title: "Tipos de Documentos",
    icon: "article",
    routeName: "document-type-form",
  },
  {
    title: "Formas de Pagamento",
    icon: "local_atm",
    routeName: "payment-method-form",
  },
  { title: "Sair", icon: "logout", routeName: "user-logout" },
];
</script>

<template>
  <q-drawer
    v-model="store.isSidebarOpen"
    show-if-above
    :breakpoint="690"
    class="bg-grey-2"
  >
    <q-toolbar class="bg-blue-grey-4">
      <q-toolbar-title class="q-ml-xs text-white">Menu</q-toolbar-title>
    </q-toolbar>

    <q-list class="text-blue-grey-7">
      <q-item
        v-for="(link, index) in linksList"
        :key="index"
        clickable
        :to="{ name: link.routeName }"
        exact
      >
        <q-item-section v-if="link.icon" avatar>
          <q-icon :name="link.icon" size="sm" class="q-mr-md" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            {{ link.title }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
