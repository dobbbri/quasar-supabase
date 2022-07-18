import { ref } from 'vue';
import { useApi } from 'src/composables';

const address = ref(null);

export default function useCustomersAddresses() {
  const { loading, get, add, edit, remove } = useApi('customers_addresses');

  const clearAddress = () => {
    address.value = {
      id: 0,
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: ''
    };
  };

  return {
    loading,
    address,
    clearAddress,
    getAddress: get,
    addAddress: add,
    editAddress: edit,
    removeAddress: remove
  };
}
