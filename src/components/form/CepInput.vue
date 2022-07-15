<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

// const handleFindCEP = () => {
//   if (formAddress.value && formAddress.value.zip_code.length == 9) {
//     $q.loading.show();
//
//     const url = `https://brasilapi.com.br/api/cep/v1/${formAddress.value.zip_code}`;
//     const options = {
//       method: 'GET',
//       mode: 'cors',
//       headers: { 'content-type': 'application/json;charset=utf-8' },
//       timeout: 30000
//     };
//
//     fetch(url, options)
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(response.statusText);
//       })
//       .then((data) => {
//         formAddress.value.street = data.street;
//         formAddress.value.neighborhood = data.neighborhood;
//         formAddress.value.state = data.state;
//         formAddress.value.city = data.city;
//       })
//       .catch((error) => notify.error('CEP não localizado', error));
//     $q.loading.hide();
//   }
// };
</script>

<template>
  <q-input type="text" v-bind="attr.input.basic" />
</template>
