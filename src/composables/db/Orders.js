import { ref } from 'vue';
import { useApi } from 'src/composables';

const order = ref(null);

export default function useOrders() {
  const { loading, list, get, add, edit, remove, count } = useApi('orders');

  const clearOrder = () => {
    order.value = {
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
    order,
    clearOrder,
    getOrders: list,
    getOrder: get,
    addOrder: add,
    editOrder: edit,
    removeOrder: remove,
    countOrder: count
  };
}
