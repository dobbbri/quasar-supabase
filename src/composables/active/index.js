import { ref } from 'vue';

const active = ref(null);

export default function useActive() {
  const clearActive = () => {
    active.value = {
      formName: '',
      customerName: ''
    };
  };

  return {
    active,
    clearActive
  };
}
