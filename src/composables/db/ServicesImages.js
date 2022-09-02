import { ref } from 'vue'
import { useApiImage } from 'src/composables'

const image = ref(null)

export default function useServicesImages() {
  const { getImageURL, addImage, editImage, removeImage } = useApiImage()
  const serviceFolder = 'services'

  return {
    image,
    serviceFolder,
    getServiceImageURL: getImageURL,
    addServiceImage: addImage,
    editServiceImage: editImage,
    removeServiceImage: removeImage
  }
}
