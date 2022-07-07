import { defineStore } from 'pinia';

const menuPage = [
  {
    name: 'Atalhos Principais',
    btns: [
      {
        title: 'Adicionar Pedido',
        icon: 'sym_o_post_add',
        iconColor: 'blue',
        routeName: 'order-form'
      },
      {
        title: 'Consultar Pedidos',
        icon: 'sym_o_list_alt',
        iconColor: 'blue',
        routeName: 'order-list'
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
        routeName: 'revenue-form'
      },
      {
        title: 'Adicionar Custos',
        icon: 'sym_o_do_not_disturb_on',
        iconColor: 'red',
        routeName: 'cost-form'
      },
      {
        title: 'Emitir Recibo',
        icon: 'sym_o_receipt_long',
        iconColor: 'grey',
        routeName: 'print-receipt'
      },
      {
        title: 'Financeiro',
        icon: 'sym_o_analytics',
        iconColor: 'green',
        routeName: 'finance'
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
        routeName: 'appointment-form'
      },
      {
        title: 'Consultar Compromissos',
        icon: 'sym_o_calendar_month',
        iconColor: 'red',
        routeName: 'appointment-list'
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
        routeName: 'customer-form'
      },
      {
        title: 'Consultar Clientes',
        icon: 'sym_o_supervisor_account',
        iconColor: 'orange',
        routeName: 'customer-list'
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
        routeName: 'service-list'
      },
      {
        title: 'Produtos',
        icon: 'sym_o_inventory_2',
        iconColor: 'purple',
        routeName: 'product-list'
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
