import { ref, computed } from 'vue';

const state = ref({
  sidebarIsOpen: false,
  fromMenu: '',
  from1Form: '',
  from2Form: ''
});

export default function useStore() {
  const clearState = () => {
    state.value = {
      fromMenu: '',
      from1Form: '',
      from2Form: ''
    };
  };

  const fromTabMenu = computed(() => (state.value.fromMenu === 'tab-menu' ? true : false));

  const toggleSidebar = () => {
    state.value.sidebarIsOpen = !state.value.sidebarIsOpen;
  };

  return {
    state,
    clearState,
    fromTabMenu,
    toggleSidebar
  };
}
