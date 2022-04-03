<!-- <script setup> -->
<!-- import { onMounted } from 'vue' -->
<!-- import useApi from 'src/composables/UseApi' -->
<!--  -->
<!-- const { getBrand } = useApi() -->
<!--  -->
<!-- onMounted(() => { -->
<!--   getBrand() -->
<!-- }) -->
<!-- </script> -->

<template>
  <q-layout
    view="lHh Lpr lFf"
    color="grey-2"
  >
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h6">EndlesS</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
