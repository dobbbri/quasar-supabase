import { defineStore } from 'pinia'

const defaults = {
  documentTypes: [
    { abbr: 'ci', name: 'ci', active: true },
    { abbr: 'cpf', name: 'cpf', active: true },
    { abbr: 'cnpj', name: 'cnpj', active: true }
  ],
  measureUnits: [
    { abbr: 'un', name: 'unitário', active: true },
    { abbr: 'kg', name: 'kilo', active: true },
    { abbr: 'g', name: 'grama', active: true },
    { abbr: 'l', name: 'litro', active: true },
    { abbr: 'ml', name: 'mililitro', active: true },
    { abbr: 'mm', name: 'milimetro', active: true },
    { abbr: 'cm', name: 'centimetro', active: true },
    { abbr: 'm', name: 'metro', active: true },
    { abbr: 'm2', name: 'metro quadrado', active: true },
    { abbr: 'm3', name: 'metro cubico', active: true },
    { abbr: 'seg', name: 'segundo', active: true },
    { abbr: 'min', name: 'minuto', active: true },
    { abbr: 'h', name: 'hora', active: true },
    { abbr: 'dia', name: 'dia', active: true },
    { abbr: 'semana', name: 'semana', active: true },
    { abbr: 'ano', name: 'ano', active: true }
  ],
  paymentMethods: [
    { abbr: 'dinheiro', name: 'dinheiro', active: true },
    { abbr: 'crédito', name: 'cartão de crédito', active: true },
    { abbr: 'débito', name: 'cartão de débito', active: true },
    { abbr: 'pix', name: 'pix', active: true },
    { abbr: 'cheque', name: 'cheque', active: true },
    { abbr: 'boleto', name: 'boleto', active: true },
    { abbr: 'fiado', name: 'fiado', active: true },
    { abbr: 'transferência', name: 'transferência bancária', active: true },
    { abbr: 'outro', name: 'outro', active: true }
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
    user_id: 0,
    documentTypes: [],
    measureUnits: [],
    paymentMethods: []
  }),
  getters: {},
  actions: {
    setSettings(value) {
      this.user_id = value.user_id
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
    }
  },
  persist: {
    enabled: true
  }
})
