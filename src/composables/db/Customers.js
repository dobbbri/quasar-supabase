import { useApi, useImageBucket } from 'src/composables';

export default function useCustomers() {
  const { loading, list, get, add, edit, remove, count } = useApi('customers');
  const { getImageURL, addImage, editImage, removeImage } = useImageBucket();
  const customerFolder = 'customers';

  return {
    loading,
    customerFolder,
    getCustomers: list,
    getCustomer: get,
    addCustomer: add,
    editCustomer: edit,
    removeCustomer: remove,
    countCustomer: count,
    getCustomerImageURL: getImageURL,
    addCustomerImage: addImage,
    editCustomerImage: editImage,
    removeCustomerImage: removeImage
  };
}
