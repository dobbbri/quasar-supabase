<script setup>
import { useDefaults } from 'src/composables'
const { attr } = useDefaults()
</script>

<template>
  <q-input v-bind="attr.input.search" type="text" placeholder="Digite para pesquisar">
    <template #prepend>
      <q-icon name="sym_o_search" />
    </template>
  </q-input>
</template>
