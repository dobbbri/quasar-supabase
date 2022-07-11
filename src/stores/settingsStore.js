import { defineStore } from 'pinia';

const defaults = {
  measureUnits: [
    { group: 'Unidade', id: 'un.', name: 'unidades', active: true },
    { group: 'Área', id: 'm²', name: 'metros quadrados', active: true },
    { group: null, id: 'km²', name: 'kilometro quadrados', active: true },
    { group: 'Distância', id: 'mm', name: 'milimetros', active: true },
    { group: null, id: 'cm', name: 'centimetros', active: true },
    { group: null, id: 'm', name: 'metros', active: true },
    { group: null, id: 'km', name: 'kilomemetros', active: true },
    { group: 'Peso', id: 'g', name: 'gramas', active: true },
    { group: null, id: 'kg', name: 'kilogramas', active: true },
    { group: 'Tempo', id: 'min', name: 'minutos', active: true },
    { group: null, id: 'h', name: 'horas', active: true },
    { group: null, id: 'dias', name: 'dias', active: true },
    { group: null, id: 'semanas', name: 'semanas', active: true },
    { group: null, id: 'meses', name: 'meses', active: true },
    { group: 'Volume', id: 'ml', name: 'mililitro', active: true },
    { group: null, id: 'l', name: 'litro', active: true },
    { group: null, id: 'm³', name: 'metros cúbicos', active: true }
  ],
  paymentMethods: [
    { name: 'Dinheiro', active: true },
    { name: 'Cartão de Crédito', active: true },
    { name: 'Cartão de Débito', active: true },
    { name: 'Pix', active: true },
    { name: 'Cheque', active: true },
    { name: 'Boleto', active: true },
    { name: 'Fiado', active: true },
    { name: 'Transf. bancária', active: true },
    { name: 'Outro', active: true }
  ],
  orderStatus: [
    { name: 'Pendente', active: true },
    { name: 'Aguardando Aprovação', active: true },
    { name: 'Aprovado', active: true },
    { name: 'Aguardando Pagamento', active: true },
    { name: 'Enviado', active: true },
    { name: 'Concluido', active: true },
    { name: 'Cancelado', active: true }
  ],
  costCategory: [
    { name: 'Ajudantes', active: true },
    { name: 'Alimentação', active: true },
    { name: 'Produtos', active: true },
    { name: 'Outros', active: true },
    { name: 'Ferramentas', active: true },
    { name: 'Transporte', active: true },
    { name: 'Impostos', active: true }
  ],
  paymentConditions: [
    { name: 'À vista', active: true },
    { name: 'Sinal', active: true },
    { name: 'Parcelado', active: true }
  ]
};

function convertToObject(source) {
  let newTarget = [];
  for (var i = 0; i < source.length; i++) {
    const obj = source[i];
    newTarget.push(obj);
  }
  return newTarget;
}

export const useUsersSettingsStore = defineStore('settingsStore', {
  state: () => ({
    id: 0,
    measureUnits: [],
    paymentMethods: [],
    paymentConditions: [],
    orderStatus: [],
    costCategory: [],
    personTypes: [
      { label: 'Pessoa Física', value: false },
      { label: 'Pessoa Juríca', value: true }
    ]
  }),
  getters: {},
  actions: {
    setSettings(value) {
      this.id = value.id;
      this.measureUnits = convertToObject(JSON.parse(value.measure_units));
      this.paymentMethods = convertToObject(JSON.parse(value.payment_methods));
      this.paymentConditions = convertToObject(JSON.parse(value.payment_conditions));
      this.orderStatus = convertToObject(JSON.parse(value.order_status));
      this.costCategory = convertToObject(JSON.parse(value.cost_category));
    },
    getDefaults() {
      return {
        measureUnits: JSON.stringify(defaults.measureUnits),
        paymentMethods: JSON.stringify(defaults.paymentMethods),
        paymentConditions: JSON.stringify(defaults.paymentConditions),
        orderStatus: JSON.stringify(defaults.orderStatus),
        costCategory: JSON.stringify(defaults.costCategory)
      };
    }
  },
  persist: {
    enabled: true
  }
});
