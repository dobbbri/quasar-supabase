import { useApi } from 'src/composables';

export default function useStockMovement() {
  const { loading, list, add, remove } = useApi('stock_movement');

  return {
    loading,
    getStockMovements: list,
    addStockMovement: add,
    removeStockMovement: remove
  };
}
