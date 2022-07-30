import { ref, computed } from 'vue';

const state = ref({
  sidebarIsOpen: false,
  fromMenu: '',
  from1Form: '',
  from2Form: ''
});

export default function useStore() {
  const clearActive = () => {
    state.value = {
      fromMenu: '',
      from1Form: '',
      from2Form: ''
    };
  };

  const fromTabMenu = computed(() => {
    return state.value.fromMenu === 'tab-menu' ? true : false;
  });

  const toggleSidebar = () => {
    state.value.sidebarIsOpen = !state.value.sidebarIsOpen;
  };

  return {
    state,
    clearActive,
    fromTabMenu,
    toggleSidebar
  };
}
