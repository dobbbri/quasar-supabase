<script setup>
import { ref } from 'vue'
import { useDefaults } from 'src/composables'
const { attr } = useDefaults()

const mask = ref('(##) ####-#####')

const setMask = (value) => {
  mask.value = value.length > 14 ? '(##) #####-####' : '(##) ####-#####'
}
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    type="tel"
    :mask="mask"
    @update:model-value="(newValue) => setMask(newValue)"
  />
</template>
