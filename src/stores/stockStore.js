import { defineStore } from 'pinia';

export const useStockStore = defineStore('stockStore', {
  state: () => ({
    productAmount: 0,
    productMinimumAmount: 0,
    productNewAmount: 0,
    movementAmount: 0,
    movementtype: ''
  }),

  actions: {
    setProduct(amount, minimumAmount, newAmount) {
      this.productAmount = amount;
      this.productMinimumAmount = minimumAmount;
      this.productNewAmount = newAmount;
    },
    setMovement(amount, type) {
      this.movementAmount = amount;
      this.movementType = type;
    }
  }
});
