import { ref } from 'vue';
import { useApi } from 'src/composables';

const order = ref(null);
const productList = ref([]);
const serviceList = ref([]);

export default function useOrders() {
  const {
    loading,
    list: getOrders,
    get: getOrder,
    add: addOrder,
    edit: editOrder,
    remove: removeOrder,
    count: countOrder
  } = useApi('orders');

  const clearOrder = () => {
    order.value = {
      customer_id: 0,
      reference: '',
      delivery_date: '',
      budget_deadline: '',
      deadline: '',
      comments: ''
    };
  };

  return {
    loading,
    order,
    productList,
    serviceList,
    clearOrder,
    getOrders,
    getOrder,
    addOrder,
    editOrder,
    removeOrder,
    countOrder
  };
}
