<!-- todo -->
<!-- https://quasar.dev/vue-components/select#filtering-and-autocomplete -->
<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  options: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <q-select
    v-bind="attr.input.basic"
    :options="options"
    option-value="id"
    option-label="name"
    emit-value
    map-options
  />
</template>
