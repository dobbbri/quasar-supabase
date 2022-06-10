<script setup>
import { ref } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

const isPwd = ref(true);
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    :type="isPwd ? 'password' : 'text'"
    lazy-rules
  >
  </q-input>
</template>
