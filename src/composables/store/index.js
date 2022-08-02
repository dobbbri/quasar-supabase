import { ref, computed } from 'vue';

const state = ref({
  sidebarIsOpen: false,
  from: {
    menu: null,
    form1: null,
    form2: null,
    form3: null
  }
});

export default function useStore() {
  const clearFromState = () => {
    state.value.from = {
      menu: null,
      form1: null,
      form2: null,
      form3: null
    };
  };

  const isFromTabMenu = computed(() => (state.value.from.menu === 'tab-menu' ? true : false));

  const toggleSidebar = () => {
    state.value.sidebarIsOpen = !state.value.sidebarIsOpen;
  };

  return {
    state,
    clearFromState,
    isFromTabMenu,
    toggleSidebar
  };
}
