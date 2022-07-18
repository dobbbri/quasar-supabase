import { ref } from 'vue';
import { useApi } from 'src/composables';

const customer = ref(null);

export default function useCustomers() {
  const { loading, list, get, add, edit, remove, count } = useApi('customers');

  const clearCustomer = () => {
    customer.value = {
      name: '',
      is_legal_entity: false,
      email: '',
      phone_1: '',
      phone_2: '',
      document_number: '',
      notes: ''
    };
  };

  return {
    loading,
    customer,
    clearCustomer,
    getCustomers: list,
    getCustomer: get,
    addCustomer: add,
    editCustomer: edit,
    removeCustomer: remove,
    countCustomer: count
  };
}
