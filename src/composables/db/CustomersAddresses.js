import { useApi } from 'src/composables';

export default function useCustomersAddresses() {
  const { loading, get, add, edit, remove } = useApi('customers_addresses');

  return {
    loading,
    getAddresses: get,
    addAddresses: add,
    editAddresses: edit,
    removeAddresses: remove
  };
}
