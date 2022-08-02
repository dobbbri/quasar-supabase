<script setup>
import { ref } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

const mask = ref('###.###.###-##');

const setMask = (value) => {
  mask.value = value.length > 11 ? '##.###.###/####-##' : '###.###.###-##';
};
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    type="tel"
    :mask="mask"
    debounce="530"
    @update:model-value="(newValue) => setMask(newValue)"
  />
</template>
