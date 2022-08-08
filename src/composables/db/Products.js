import { ref } from 'vue';
import { useApi } from 'src/composables';

const product = ref(null);

export default function useProducts() {
  const { loading, list, get, add, edit, remove, count } = useApi('products');

  const clearProduct = () => {
    product.value = {
      name: '',
      unit_price: 0,
      measure_unit: 'un.',
      cost_price: 0,
      brand: '',
      details: ''
    };
  };

  const calcMarkup = (costPrice, percentage) => {
    const pct = percentage / 100.0;
    const multiplier = 1.0 + pct;
    return Math.round(costPrice * multiplier);
  };

  const calcProfit = (costPrice, percentage) => {
    const pct = percentage / 100.0;
    const multiplier = 1.0 - pct;
    return Math.round(costPrice / multiplier);
  };

  const calcPctMakup = (unitPrice, costPrice) => {
    return Math.round(((unitPrice - costPrice) / costPrice) * 100);
  };

  const calcPctProfit = (unitPrice, costPrice) => {
    return Math.round(((unitPrice - costPrice) / unitPrice) * 100);
  };

  return {
    loading,
    calcMarkup,
    calcPctMakup,
    calcProfit,
    calcPctProfit,
    product,
    clearProduct,
    getProducts: list,
    getProduct: get,
    addProduct: add,
    editProduct: edit,
    removeProduct: remove,
    countProduct: count
  };
}
