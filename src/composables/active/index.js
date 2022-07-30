import { ref, computed } from 'vue';

const active = ref({
  sidebarIsOpen: false,
  fromMenu: '',
  from1Form: '',
  from2Form: ''
});

export default function useActive() {
  const clearActive = () => {
    active.value = {
      fromMenu: '',
      from1Form: '',
      from2Form: ''
    };
  };

  const fromTabMenu = computed(() => {
    return active.value.fromMenu === 'tab-menu' ? true : false;
  });

  const toggleSidebar = () => {
    active.value.sidebarIsOpen = !active.value.sidebarIsOpen;
  };

  return {
    active,
    clearActive,
    fromTabMenu,
    toggleSidebar
  };
}
