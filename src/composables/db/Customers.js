import { ref } from 'vue';
import { useApi } from 'src/composables';

const customer = ref(null);
const address = ref(null);

export default function useCustomers() {
  const {
    loading,
    list: getCustomers,
    get: getCustomer,
    add: addCustomer,
    edit: editCustomer,
    remove: removeCustomer,
    count: countCustomer
  } = useApi('customers');

  const {
    get: getAddress,
    add: addAddress,
    edit: editAddress,
    remove: removeAddress
  } = useApi('customers_addresses');

  const clearCustomer = () => {
    customer.value = {
      name: '',
      email: '',
      phone_1: '',
      phone_2: '',
      document_number: '',
      notes: ''
    };
    clearAddress();
  };

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

  const addCustomerAddress = async (customer, address) => {
    const data = await addCustomer(customer);
    if (address.address) {
      address.id = data[0].id;
      await addAddress(address);
    }
  };

  const editCustomerAddress = async (customer, address) => {
    const data = await editCustomer(customer);
    if (address.id > 0) {
      await editAddress(address);
    } else {
      address.id = data[0].id;
      await addAddress(address);
    }
  };

  const removeCustomerAddress = async (customer, address) => {
    await removeCustomer(customer.id);
    if (address && address.id > 0) {
      await removeAddress(address.id);
    }
  };

  return {
    loading,
    customer,
    address,
    clearCustomer,
    getCustomers,
    getCustomer,
    getAddress,
    addCustomerAddress,
    editCustomerAddress,
    removeCustomerAddress,
    removeAddress,
    countCustomer
  };
}
