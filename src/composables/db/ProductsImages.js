import { ref } from 'vue'
import { useApiImage } from 'src/composables'

const image = ref(null)

export default function useProductsImages() {
  const { getImageURL, addImage, editImage, removeImage } = useApiImage()
  const productFolder = 'products'

  return {
    image,
    productFolder,
    getProductImageURL: getImageURL,
    addProductImage: addImage,
    editProductImage: editImage,
    removeProductImage: removeImage
  }
}
