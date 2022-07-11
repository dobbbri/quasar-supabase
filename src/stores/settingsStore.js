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
    { id: 'Dinheiro', name: 'Dinheiro', active: true },
    { id: 'crédito', name: 'Cartão de Crédito', active: true },
    { id: 'Débito', name: 'Cartão de Débito', active: true },
    { id: 'Pix', name: 'Pix', active: true },
    { id: 'Cheque', name: 'Cheque', active: true },
    { id: 'Boleto', name: 'Boleto', active: true },
    { id: 'Fiado', name: 'Fiado', active: true },
    { id: 'Transferência', name: 'Transferência bancária', active: true },
    { id: 'Outro', name: 'Outro', active: true }
  ],
  orderStatus: [
    { id: 'Pendente', name: 'Pendente', active: true },
    { id: 'Aguardando Aprovação', name: 'Aguardando Aprovação', active: true },
    { id: 'Aprovado', name: 'Aprovado', active: true },
    { id: 'Aguardando Pagamento', name: 'Aguardando Pagamento', active: true },
    { id: 'Enviado', name: 'Enviado', active: true },
    { id: 'Concluido', name: 'Concluido', active: true },
    { id: 'Cancelado', name: 'Cancelado', active: true }
  ],
  costCategory: [
    { id: 'Ajudantes', name: 'Ajudantes', active: true },
    { id: 'Alimentação', name: 'Alimentação', active: true },
    { id: 'Produtos', name: 'Produtos', active: true },
    { id: 'Outros', name: 'Outros', active: true },
    { id: 'Ferramentas', name: 'Ferramentas', active: true },
    { id: 'Transporte', name: 'Transporte', active: true },
    { id: 'Impostos', name: 'Impostos', active: true }
  ],
  paymentConditions: [
    { id: 'À vista', name: 'À vista', active: true },
    { id: 'Sinal', name: 'Sinal', active: true },
    { id: 'Parcelado', name: 'Parcelado', active: true }
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
