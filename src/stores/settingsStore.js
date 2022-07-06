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
    { id: 'dinheiro', name: 'dinheiro', active: true },
    { id: 'crédito', name: 'cartão de crédito', active: true },
    { id: 'débito', name: 'cartão de débito', active: true },
    { id: 'pix', name: 'pix', active: true },
    { id: 'cheque', name: 'cheque', active: true },
    { id: 'boleto', name: 'boleto', active: true },
    { id: 'fiado', name: 'fiado', active: true },
    { id: 'transferência', name: 'transferência bancária', active: true },
    { id: 'outro', name: 'outro', active: true }
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
    },
    getDefaults() {
      return {
        measureUnits: JSON.stringify(defaults.measureUnits),
        paymentMethods: JSON.stringify(defaults.paymentMethods),
        paymentConditions: JSON.stringify(defaults.paymentConditions)
      };
    }
  },
  persist: {
    enabled: true
  }
});
