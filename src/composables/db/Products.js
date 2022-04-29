import { useApi } from 'src/composables'

export default function useProducts() {
  const {
    loading,
    list,
    get,
    add,
    edit,
    remove,
    count,
    getImage,
    addImage,
    editImage,
    removeImage
  } = useApi('products')

  return {
    loading,
    getProducts: list,
    getProduct: get,
    addProduct: add,
    editProduct: edit,
    removeProduct: remove,
    countProduct: count,
    getProductImage: getImage,
    addProductImage: addImage,
    editProductImage: editImage,
    removeProductImage: removeImage
  }
}
