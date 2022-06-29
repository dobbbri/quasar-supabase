import { ref } from 'vue';
import { setCssVar, Loading } from 'quasar';
import { useRoute } from 'vue-router';
import { useSupabase } from 'src/boot/supabase';
import { useAuth } from 'src/composables';

const brand = ref({
  primary: '',
  secondary: '',
  name: '',
  phone: '',
  paralax_url: ''
});

export default function useBrands() {
  const route = useRoute();
  const { supabase } = useSupabase();
  const { user } = useAuth();

  const setBrand = (primary, secondary) => {
    if (primary) {
      setCssVar('primary', primary);
    }
    if (secondary) {
      setCssVar('secondary', secondary);
    }
  };

  const getBrand = async () => {
    const id = route.params.id || user.id;
    if (id) {
      Loading.show({ backgroundColor: 'dark' });

      const { data, error } = await supabase.from('config').select('*').eq('user_id', id);
      if (error) throw error;

      if (data.length > 0) {
        brand.value = data[0];
        setBrand(brand.value.primary, brand.value.secondary);
      }

      Loading.hide();

      return brand;
    }
  };

  return {
    setBrand,
    getBrand
  };
}
