import { useApi } from 'src/composables'

export default function useMeasureUnits() {
  const { loading, list, get, add, edit, remove, count } = useApi('measure_units')

  return {
    loading,
    getMeasureUnits: list,
    getMeasureUnit: get,
    addMeasureUnit: add,
    editMeasureUnit: edit,
    removeMeasureUnit: remove,
    countMeasureUnit: count
  }
}
