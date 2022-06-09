import { defineStore } from 'pinia';

const menuList = [
  { title: 'Início', icon: 'sym_r_home', routeName: 'index' },
  { title: 'Categorias', icon: 'sym_r_interests', routeName: 'category-list' },
  { title: 'Produtos', icon: 'sym_r_inventory_2', routeName: 'product-list' },
  {
    title: 'Clientes',
    icon: 'sym_r_supervisor_account',
    routeName: 'customer-list'
  },
  { title: 'Configuracões', icon: 'sym_r_tune', routeName: 'settings-form' },
  {
    title: 'Unidade de Medidas',
    icon: 'sym_r_scale',
    routeName: 'measure-unit-form'
  },
  {
    title: 'Tipos de Documentos',
    icon: 'sym_r_article',
    routeName: 'document-type-form'
  },
  {
    title: 'Formas de Pagamento',
    icon: 'sym_r_local_atm',
    routeName: 'payment-method-form'
  },
  { title: 'Sair', icon: 'sym_r_logout', routeName: 'user-logout' }
];

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    isSidebarOpen: false
  }),
  getters: {
    menuList() {
      return menuList;
    }
  },
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
});
