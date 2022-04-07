import { ref, computed } from 'vue'

export default function useLoading() {
  //   add: false,
  //   edit: false,
  //   remove: false,
  //   disable: false
  // })
  const loadingList = ref(false)
  const loadingAdd = ref(false)
  const loadingEdit = ref(false)
  const loadingRemove = ref(false)
  const loadingDisable = ref(false)

  const setLoading = {
    list(value) {
      loadingList.value = value
    },
    add: (value) => {
      loadingAdd.value = value
      loadingDisable.value = value
    },
    edit: (value) => {
      loadingEdit.value = value
      loadingDisable.value = value
    },
    remove: (value) => {
      loadingRemove.value = value
      loadingDisable.value = value
    }
  }

  const loading = {
    list: computed(() => loadingList.value),
    add: computed(() => loadingAdd.value),
    edit: computed(() => loadingEdit.value),
    remove: computed(() => loadingRemove.value),
    disable: computed(() => loadingDisable.value)
  }

  return {
    setLoading,
    loading
  }
}
