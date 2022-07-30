import { ref } from 'vue';
import { useApi } from 'src/composables';

const service = ref(null);

export default function useServices() {
  const { loading, list, get, add, edit, remove, count } = useApi('services');

  const clearService = () => {
    service.value = {
      name: '',
      details: '',
      unit_price: 0,
      measure_unit: 'un.'
    };
  };

  return {
    loading,
    service,
    clearService,
    getServices: list,
    getService: get,
    addService: add,
    editService: edit,
    removeService: remove,
    countService: count
  };
}
