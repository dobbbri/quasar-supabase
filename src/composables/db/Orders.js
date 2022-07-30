import { ref } from 'vue';
import { useApi } from 'src/composables';

const order = ref(null);
const orderProduct = ref(null);
const orderService = ref(null);
const productList = ref(null);
const serviceList = ref(null);
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

  const clearOrderProduct = () => {
    orderProduct.value = {
      id: 0,
      name: '',
      price: 0,
      measure_unit: 'un.',
      amount: 0
    };
  };
  const clearOrderService = () => {
    orderService.value = {
      id: 0,
      name: '',
      price: 0,
      measure_unit: 'un.',
      amount: 0
    };
  };

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
      order_id: '',
      created_at: '',
      delivery_date: '',
      budget_deadline: '',
      deadline: '',
      products_total: 0,
      services_total: 0
    };
    productList.value = [];
    serviceList.value = [];
  };

  return {
    loading,
    order,
    temp,
    orderProduct,
    orderService,
    productList,
    serviceList,
    clearOrder,
    clearOrderProduct,
    clearOrderService,
    getOrders,
    getOrder,
    addOrder,
    editOrder,
    removeOrder,
    countOrder
  };
}
