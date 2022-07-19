import { ref } from 'vue';
import { useApi } from 'src/composables';

const product = ref(null);

export default function useProducts() {
  const { loading, list, get, add, edit, remove, count } = useApi('products');

  const clearProduct = () => {
    product.value = {
      name: '',
      price: 0,
      measure_unit: 'un.',
      cost_price: 0,
      brand: '',
      details: ''
    };
  };

  return {
    loading,
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
