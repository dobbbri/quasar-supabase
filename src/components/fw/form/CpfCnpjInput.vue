<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

const props = defineProps({
  isLegalEntity: { type: Boolean, default: true }
});
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    type="tel"
    :label="props.isLegalEntity ? 'CNPJ' : 'CPF'"
    :mask="isLegalEntity ? '##.###.###/####-##' : '###.###.###-##'"
    debounce="530"
  />
</template>
