<script setup>
import { defineProps } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';
import { useDefaults } from 'src/composables';
const { attr } = useDefaults();

defineProps({
  modelValue: { type: [Number, String], required: true }
});

const { inputRef, formattedValue } = useCurrencyInput({
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
});
</script>

<template>
  <q-input
    v-bind="attr.input.basic"
    ref="inputRef"
    type="tel"
    :model-value="formattedValue"
  />
</template>
