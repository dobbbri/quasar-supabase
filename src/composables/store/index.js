import { ref, computed } from 'vue';

const state = ref({
  sidebarIsOpen: false,
  from: {
    menu: '',
    form1: '',
    form2: '',
    form3: ''
  }
});

export default function useStore() {
  const clearFromState = () => {
    state.value.from = {
      menu: '',
      form1: '',
      form2: '',
      form3: ''
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
