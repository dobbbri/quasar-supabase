import { ref, computed } from 'vue';

const active = ref(null);

export default function useActive() {
  const clearActive = () => {
    active.value = {
      fromMenu: '',
      fromForm: '',
      customerName: ''
    };
  };

  const fromTabMenu = computed(() => {
    return active.value.fromMenu === 'tab-menu' ? true : false;
  });

  return {
    active,
    clearActive,
    fromTabMenu
  };
}
