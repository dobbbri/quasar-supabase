import { useApiImage } from 'src/composables';

export default function useCustomersImages() {
  const { getImageURL, addImage, editImage, removeImage } = useApiImage();
  const customerFolder = 'customers';

  return {
    customerFolder,
    getCustomerImageURL: getImageURL,
    addCustomerImage: addImage,
    editCustomerImage: editImage,
    removeCustomerImage: removeImage
  };
}
