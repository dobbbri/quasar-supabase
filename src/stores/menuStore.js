import { defineStore } from 'pinia';

const menuPage = [
  {
    name: 'Atalhos Principais',
    btns: [
      {
        title: 'Adicionar Pedido',
        icon: 'sym_o_post_add',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Consultar Pedidos',
        icon: 'sym_o_list_alt',
        iconColor: 'Primary',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Financeiro',
    btns: [
      {
        title: 'Adicionar Recebimentos',
        icon: 'sym_o_paid',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Adicionar Custos',
        icon: 'sym_o_attach_money',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Emitir Recibo',
        icon: 'sym_o_receipt_long',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Financeiro',
        icon: 'sym_o_analytics',
        iconColor: 'Primary',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Compromissos',
    btns: [
      {
        title: 'Agendar Compromisso',
        icon: 'sym_o_calendar_add_on',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Consultar Compromissos',
        icon: 'sym_o_calendar_month',
        iconColor: 'Primary',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Clientes',
    btns: [
      {
        title: 'Adicionar Cliente',
        icon: 'sym_o_person_add',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Consultar Clientes',
        icon: 'sym_o_supervisor_account',
        iconColor: 'Primary',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Catálogo',
    btns: [
      {
        title: 'Serviços',
        icon: 'sym_o_design_services',
        iconColor: 'Primary',
        routeName: 'index'
      },
      {
        title: 'Produtos',
        icon: 'sym_o_inventory_2',
        iconColor: 'Primary',
        routeName: 'index'
      }
    ]
  }
];

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
    },
    menuPage() {
      return menuPage;
    }
  },
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
});
