import { useApi, useImageBucket } from 'src/composables';

export default function useProducts() {
  const { loading, list, get, add, edit, remove, count } = useApi('products');
  const { getImageURL, addImage, editImage, removeImage } = useImageBucket();
  const productFolder = 'products';

  return {
    loading,
    productFolder,
    getProducts: list,
    getProduct: get,
    addProduct: add,
    editProduct: edit,
    removeProduct: remove,
    countProduct: count,
    getProductImageURL: getImageURL,
    addProductImage: addImage,
    editProductImage: editImage,
    removeProductImage: removeImage
  };
}
