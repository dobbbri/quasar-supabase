import { useApi } from 'src/composables';

export default function useProducts() {
  const { loading, list, get, add, edit, remove, count } = useApi('products');

  return {
    loading,
    getProducts: list,
    getProduct: get,
    addProduct: add,
    editProduct: edit,
    removeProduct: remove,
    countProduct: count
  };
}
