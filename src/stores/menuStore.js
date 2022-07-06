import { defineStore } from 'pinia';

const menuPage = [
  {
    name: 'Atalhos Principais',
    btns: [
      {
        title: 'Adicionar Pedido',
        icon: 'sym_o_post_add',
        iconColor: 'blue',
        routeName: 'index'
      },
      {
        title: 'Consultar Pedidos',
        icon: 'sym_o_list_alt',
        iconColor: 'blue',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Financeiro',
    btns: [
      {
        title: 'Adicionar Recebimentos',
        icon: 'sym_o_add_circle',
        iconColor: 'green',
        routeName: 'index'
      },
      {
        title: 'Adicionar Custos',
        icon: 'sym_o_do_not_disturb_on',
        iconColor: 'red',
        routeName: 'index'
      },
      {
        title: 'Emitir Recibo',
        icon: 'sym_o_receipt_long',
        iconColor: 'grey',
        routeName: 'index'
      },
      {
        title: 'Financeiro',
        icon: 'sym_o_analytics',
        iconColor: 'green',
        routeName: 'index'
      }
    ]
  },
  {
    name: 'Compromissos',
    btns: [
      {
        title: 'Agendar Compromisso',
        icon: 'sym_o_more_time',
        iconColor: 'red',
        routeName: 'index'
      },
      {
        title: 'Consultar Compromissos',
        icon: 'sym_o_calendar_month',
        iconColor: 'red',
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
        iconColor: 'orange',
        routeName: 'index'
      },
      {
        title: 'Consultar Clientes',
        icon: 'sym_o_supervisor_account',
        iconColor: 'orange',
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
        iconColor: 'purple',
        routeName: 'index'
      },
      {
        title: 'Produtos',
        icon: 'sym_o_inventory_2',
        iconColor: 'purple',
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
