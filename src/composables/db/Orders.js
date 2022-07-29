import { ref } from 'vue';
import { useApi } from 'src/composables';

const order = ref(null);
const productList = ref([]);
const serviceList = ref([]);
const temp = ref(null);

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

  // const {
  //   get: getOrderProduct,
  //   add: addOrderProduct,
  //   edit: editOrderProduct,
  //   remove: removeOrderProduct
  // } = useApi('orders_products');

  // const {
  //   get: getOrderService,
  //   add: addOrderService,
  //   edit: editOrderService,
  //   remove: removeOrdeServicer
  // } = useApi('orders_services');

  const clearOrder = () => {
    order.value = {
      customer_id: 0,
      customer_name: '',
      delivery_date: '',
      budget_deadline: '',
      deadline: '',
      comments: '',
      total: 0
    };
    temp.value = {
      delivery_date: '',
      budget_deadline: '',
      deadline: ''
    };
    productList.value = [];
    serviceList.value = [];
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
