import { defineStore } from "pinia";

const defaults = {
  documentTypes: [
    { abbr: "CI", name: "Cédula de Identidade", active: true },
    { abbr: "CPF", name: "C.P.F.", active: true },
    { abbr: "CNPJ", name: "C.N.P.J.", active: true },
  ],
  measureUnits: [
    { group: "Unidade", abbr: "un.", name: "unidades", active: true },
    { group: "Área", abbr: "m2", name: "metros quadrados", active: true },
    { group: null, abbr: "km2", name: "kilometro quadrados", active: true },
    { group: "Distância", abbr: "mm", name: "milimetros", active: true },
    { group: null, abbr: "cm", name: "centimetros", active: true },
    { group: null, abbr: "m", name: "metros", active: true },
    { group: null, abbr: "km", name: "kilomemetros", active: true },
    { group: "Peso", abbr: "g", name: "gramas", active: true },
    { group: null, abbr: "kg", name: "kilogramas", active: true },
    { group: "Tempo", abbr: "seg", name: "segundos", active: true },
    { group: null, abbr: "min", name: "minutos", active: true },
    { group: null, abbr: "h", name: "horas", active: true },
    { group: null, abbr: "dias", name: "dias", active: true },
    { group: null, abbr: "semanas", name: "semanas", active: true },
    { group: null, abbr: "meses", name: "meses", active: true },
    { group: null, abbr: "anos", name: "anos", active: true },
    { group: "Volume", abbr: "ml", name: "mililitro", active: true },
    { group: null, abbr: "l", name: "litro", active: true },
    { group: null, abbr: "m3", name: "metros cúbicos", active: true },
  ],
  paymentMethods: [
    { abbr: "dinheiro", name: "dinheiro", active: true },
    { abbr: "crédito", name: "cartão de crédito", active: true },
    { abbr: "débito", name: "cartão de débito", active: true },
    { abbr: "pix", name: "pix", active: true },
    { abbr: "cheque", name: "cheque", active: true },
    { abbr: "boleto", name: "boleto", active: true },
    { abbr: "fiado", name: "fiado", active: true },
    { abbr: "transferência", name: "transferência bancária", active: true },
    { abbr: "outro", name: "outro", active: true },
  ],
};

function convertToObject(source) {
  let newTarget = [];
  for (var i = 0; i < source.length; i++) {
    const obj = source[i];
    newTarget.push(obj);
  }
  return newTarget;
}

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    id: 0,
    documentTypes: [],
    measureUnits: [],
    paymentMethods: [],
  }),
  getters: {},
  actions: {
    setSettings(value) {
      this.id = value.id;
      this.documentTypes = convertToObject(JSON.parse(value.document_types));
      this.measureUnits = convertToObject(JSON.parse(value.measure_units));
      this.paymentMethods = convertToObject(JSON.parse(value.payment_methods));
    },
    getDefaults() {
      return {
        documentTypes: JSON.stringify(defaults.documentTypes),
        measureUnits: JSON.stringify(defaults.measureUnits),
        paymentMethods: JSON.stringify(defaults.paymentMethods),
      };
    },
  },
  persist: {
    enabled: true,
  },
});
