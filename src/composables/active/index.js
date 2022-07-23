import { ref, computed } from 'vue';

const active = ref(null);

export default function useActive() {
  const clearActive = () => {
    active.value = {
      formName: '',
      fromApp: '',
      customerName: ''
    };
  };

  const fromTabMenu = computed(() => {
    return active.value.fromApp == 'tab-menu' ? true : false;
  });

  return {
    active,
    clearActive,
    fromTabMenu
  };
}
