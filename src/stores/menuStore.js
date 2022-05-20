import { defineStore } from 'pinia';

const menuList = [
  { title: 'Início', icon: 'home', routeName: 'index' },
  { title: 'Categorias', icon: 'category', routeName: 'category-list' },
  { title: 'Produtos', icon: 'inventory', routeName: 'product-list' },
  { title: 'Clientes', icon: 'supervisor_account', routeName: 'customer-list' },
  { title: 'Configuracões', icon: 'tune', routeName: 'config' },
  {
    title: 'Unidade de Medidas',
    icon: 'scale',
    routeName: 'measure-unit-form'
  },
  {
    title: 'Tipos de Documentos',
    icon: 'article',
    routeName: 'document-type-form'
  },
  {
    title: 'Formas de Pagamento',
    icon: 'local_atm',
    routeName: 'payment-method-form'
  },
  { title: 'Sair', icon: 'logout', routeName: 'user-logout' }
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
