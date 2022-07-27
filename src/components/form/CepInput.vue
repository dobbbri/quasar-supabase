<script setup>
import { defineProps, defineEmits } from 'vue';
import { useQuasar } from 'quasar';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();
const $q = useQuasar();

const props = defineProps({
  cep: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['update:cep', 'result']);

const handleFindCEP = () => {
  if (props.cep && props.cep.length == 9) {
    $q.loading.show();

    const url = `https://brasilapi.com.br/api/cep/v1/${props.cep}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: { 'content-type': 'application/json;charset=utf-8' },
      timeout: 30000
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => emit('result', data));

    $q.loading.hide();
  }
};
</script>

<template>
  <q-input
    type="text"
    v-bind="attr.input.basic"
    mask="#####-###"
    :model-value="cep"
    @blur="handleFindCEP"
    @update:model-value="(value) => emit('update:cep', value)"
  />
</template>
