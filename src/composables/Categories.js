import { useApi } from 'src/composables'

export default function useCategories() {
  const { loading, list, get, add, edit, remove, count } = useApi('categories')

  return {
    loading,
    getCategories: list,
    getCategory: get,
    addCategory: add,
    editCategory: edit,
    removeCategory: remove,
    countCategory: count
  }
}
