import { useApi } from 'src/composables';

export default function useCustomers() {
  const { loading, list, get, add, edit, remove, count } = useApi('customers');

  return {
    loading,
    getCustomers: list,
    getCustomer: get,
    addCustomer: add,
    editCustomer: edit,
    removeCustomer: remove,
    countCustomer: count
  };
}
