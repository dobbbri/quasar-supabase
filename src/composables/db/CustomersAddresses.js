import { useApi } from 'src/composables';

export default function useCustomers() {
  const { loading, get, add, edit, remove } = useApi('customers');

  return {
    loading,
    getCustomer: get,
    addCustomer: add,
    editCustomer: edit,
    removeCustomer: remove
  };
}
