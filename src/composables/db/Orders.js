import { ref } from 'vue';
import { useApi } from 'src/composables';

const order = ref(null);

export default function useOrders() {
  const { loading, list, get, add, edit, remove, count } = useApi('orders');

  const clearOrder = () => {
    order.value = {
      customer_id: 0,
      reference: '',
      delivery_date: '',
      budget_deadline: '',
      deadline: '',
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
