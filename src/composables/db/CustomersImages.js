import { ref } from 'vue';
import { useApiImage } from 'src/composables';

const image = ref(null);

export default function useCustomersImages() {
  const { getImageURL, addImage, editImage, removeImage } = useApiImage();
  const customerFolder = 'customers';

  return {
    image,
    customerFolder,
    getCustomerImageURL: getImageURL,
    addCustomerImage: addImage,
    editCustomerImage: editImage,
    removeCustomerImage: removeImage
  };
}
