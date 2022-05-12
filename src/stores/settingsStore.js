import { defineStore } from 'pinia'

const defaults = {
  documentTypes: [
    { abbr: 'ci', name: 'ci', inactive: false },
    { abbr: 'cpf', name: 'cpf', inactive: false },
    { abbr: 'cnpj', name: 'cnpj', inactive: false }
  ],
  measureUnits: [
    { abbr: 'un', name: 'unitário', inactive: false },
    { abbr: 'kg', name: 'kilo', inactive: false },
    { abbr: 'g', name: 'grama', inactive: false },
    { abbr: 'l', name: 'litro', inactive: false },
    { abbr: 'ml', name: 'mililitro', inactive: false },
    { abbr: 'mm', name: 'milimetro', inactive: false },
    { abbr: 'cm', name: 'centimetro', inactive: false },
    { abbr: 'm', name: 'metro', inactive: false },
    { abbr: 'm2', name: 'metro quadrado', inactive: false },
    { abbr: 'm3', name: 'metro cubico', inactive: false },
    { abbr: 'seg', name: 'segundo', inactive: false },
    { abbr: 'min', name: 'minuto', inactive: false },
    { abbr: 'h', name: 'hora', inactive: false },
    { abbr: 'dia', name: 'dia', inactive: false },
    { abbr: 'semana', name: 'semana', inactive: false },
    { abbr: 'ano', name: 'ano', inactive: false }
  ],
  paymentMethods: [
    { abbr: 'dinheiro', name: 'dinheiro', inactive: false },
    { abbr: 'crédito', name: 'cartão de crédito', inactive: false },
    { abbr: 'débito', name: 'cartão de débito', inactive: false },
    { abbr: 'pix', name: 'pix', inactive: false },
    { abbr: 'cheque', name: 'cheque', inactive: false },
    { abbr: 'boleto', name: 'boleto', inactive: false },
    { abbr: 'fiado', name: 'fiado', inactive: false },
    { abbr: 'transferência', name: 'transferência bancária', inactive: false },
    { abbr: 'outro', name: 'outro', inactive: false }
  ]
}

function convertToObject(source) {
  let newTarget = []
  for (var i = 0; i < source.length; i++) {
    const obj = source[i]
    newTarget.push(obj)
  }
  return newTarget
}

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    id: 0,
    documentTypes: [],
    measureUnits: [],
    paymentMethods: []
  }),
  getters: {},
  actions: {
    setSettings(value) {
      this.id = value.id
      this.documentTypes = convertToObject(JSON.parse(value.document_types))
      this.measureUnits = convertToObject(JSON.parse(value.measure_units))
      this.paymentMethods = convertToObject(JSON.parse(value.payment_methods))
    },
    getDefaults() {
      return {
        documentTypes: JSON.stringify(defaults.documentTypes),
        measureUnits: JSON.stringify(defaults.measureUnits),
        paymentMethods: JSON.stringify(defaults.paymentMethods)
      }
    },
    addDefaults() {
      this.documentTypes = defaults.documentTypes
      this.measureUnits = defaults.measureUnits
      this.paymentMethods = defaults.paymentMethods
    }
  },
  persist: {
    enabled: true
  }
})
