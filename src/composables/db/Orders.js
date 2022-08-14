import { ref } from 'vue';
import { useApi } from 'src/composables';

const temp = ref(null);
const order = ref(null);
const orderProduct = ref(null);
const orderService = ref(null);

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
      products_total: 0,
      services_total: 0,
      total: 0
    };
    temp.value = {
      order_id: '',
      created_at: '',
      delivery_date: '',
      budget_deadline: '',
      deadline: '',
      active: '',
      product: {
        total: 0,
        list: [],
        selected: 0
      },
      service: {
        total: 0,
        list: [],
        selected: 0
      }
    };
  };

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

  return {
    loading,
    temp,
    order,
    orderProduct,
    orderService,
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

// clientId,clientName,
// createdAt,
// currency,

// descriptions.description,
// descriptions.price,
// descriptions.quantity,
// descriptions.unitPrice,
// descriptions.unitType,

// discount.materialDiscount,
// discount.materialDiscountType,
// discount.serviceDiscount,
// discount.serviceDiscountType,
// discount.totalDiscount,
// discount.totalMaterialsDiscount,
// discount.totalServicesDiscount,

// fop.bankSlip,
// fop.bankTransfer,
// fop.cash,
// fop.cheque,
// fop.creditCard,
// fop.debitCard,
// fop.info,
// fop.pix,

// guarantee,guaranteeType,

// id,
// jobAdditionalInfo,
// jobDate,
// jobNumber,
// jobTimeInMillis,
// jobTimeInMillisUTC,
// jobTitle,
// jobType,
// jobYear,
// language,

// paymentConditions,

// pc_id,
// pc_installments,
// pc_upfront,

// totalPrice,
// totalPriceJobDescriptions,
// totalPriceJobMaterials,
// type_client_created,
// type_client_date,
// type_client_updated,
// type_client_year_number,
// type_created,
// type_date,
// type_updated,
// type_year_number,
// updatedAt,
// lang,

// materials.cost,
// materials.details,
// materials.id,
// materials.image,
// materials.margin,
// materials.markup,
// materials.material,
// materials.price,
// materials.quantity,
// materials.standardId,
// materials.trademark,
// materials.unitPrice,
// materials.unitType
