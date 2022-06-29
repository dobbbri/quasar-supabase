import { useApiImage } from 'src/composables';

export default function useProductsImages() {
  const { getImageURL, addImage, editImage, removeImage } = useApiImage();
  const productFolder = 'products';

  return {
    productFolder,
    getProductImageURL: getImageURL,
    addProductImage: addImage,
    editProductImage: editImage,
    removeProductImage: removeImage
  };
}
