import { useApi } from 'src/composables';

export default function useServices() {
  const { loading, list, get, add, edit, remove, count } = useApi('services');

  return {
    loading,
    getServices: list,
    getService: get,
    addService: add,
    editService: edit,
    removeService: remove,
    countService: count
  };
}
