import { defineStore } from 'pinia';

const menuList = [
  { title: 'Início', icon: 'sym_o_home', routeName: 'index' },
  { title: 'Categorias', icon: 'sym_o_interests', routeName: 'category-list' },
  { title: 'Produtos', icon: 'sym_o_inventory_2', routeName: 'product-list' },
  {
    title: 'Clientes',
    icon: 'sym_o_supervisor_account',
    routeName: 'customer-list'
  },
  { title: 'Configuracões', icon: 'sym_o_tune', routeName: 'settings-form' },
  {
    title: 'Unidade de Medidas',
    icon: 'sym_o_scale',
    routeName: 'measure-unit-form'
  },
  {
    title: 'Formas de Pagamento',
    icon: 'sym_o_local_atm',
    routeName: 'payment-method-form'
  },
  { title: 'Sair', icon: 'sym_o_logout', routeName: 'user-logout' }
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
