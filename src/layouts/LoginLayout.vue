<script setup>
import { onMounted } from 'vue'
import useApi from 'src/composables/UseApi'

const { getBrand } = useApi()

onMounted(() => {
  getBrand()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>EndlesS</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
