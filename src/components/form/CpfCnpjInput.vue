<script setup>
import { defineProps, ref } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

const props = defineProps({
  isLegalEntity: { type: Boolean, default: true }
});

const label = ref('');
label.value = props.isLegalEntity ? 'CNPJ' : 'CPF';
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    type="tel"
    :label="label"
    :mask="isLegalEntity ? '##.###.###/####-##' : '###.###.###-##'"
    debounce="530"
  />
</template>
