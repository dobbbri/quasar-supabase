<script setup>
import { defineProps, watch } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'
import { useDefaults } from 'src/composables'

const { attr } = useDefaults()

const props = defineProps({
  modelValue: { type: [Number, String], default: 0 }
})

const { inputRef, formattedValue, setValue } = useCurrencyInput({
  locale: 'pt-BR',
  currency: 'BRL',
  currencyDisplay: 'hidden',
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  autoSign: true,
  useGrouping: true,
  accountingSign: false
})

watch(
  () => props.modelValue,
  (value) => {
    setValue(value)
  }
)
</script>

<template>
  <q-input ref="inputRef" type="tel" :model-value="formattedValue" v-bind="attr.input.basic" />
</template>
