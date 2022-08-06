<script setup>
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();
</script>

<template>
  <q-input type="tel" v-bind="attr.input.basic" mask="#.## %" fill-mask="0" reverse-fill-mask />
</template>
