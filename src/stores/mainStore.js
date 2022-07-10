import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    customer: {},
    product: {},
    service: {}
  }),

  actions: {
    setCustomer(value) {
      this.customer = value;
    },
    clearCustomer() {
      this.customer = {};
    },

    setProduct(value) {
      this.product = value;
    },
    clearProduct() {
      this.product = {};
    },

    setService(value) {
      this.service = value;
    },
    clearService() {
      this.service = {};
    }
  }
});
