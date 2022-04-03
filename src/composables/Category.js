import { useApi } from 'src/composables'
const { list, getById, add, edit, remove } = useApi()

const table = 'categories'

export default function useCategory() {
  const getCategories = () => {
    return list(table)
  }

  const getCategory = (id) => {
    return getById(table, id)
  }

  const addCategory = (form) => {
    return add(table, form)
  }

  const editCategory = (form) => {
    let { id, ...formData } = form
    return edit(table, formData, id)
  }

  const removeCategory = (form) => {
    let { id, ...formData } = form
    return remove(table, formData, id)
  }

  return {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory
  }
}
