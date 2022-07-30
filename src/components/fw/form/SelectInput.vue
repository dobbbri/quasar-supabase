<script setup>
import { defineProps } from 'vue';
import { useDefaults } from 'src/composables';

const { attr } = useDefaults();

defineProps({
  text: { type: String, default: '' }
});
</script>

<template>
  <q-field v-bind="attr.input.basic">
    <template #control>
      <div class="self-center full-width no-outline" tabindex="0" @click="selectCustomer">
        {{ text }}
      </div>
    </template>
  </q-field>
</template>
