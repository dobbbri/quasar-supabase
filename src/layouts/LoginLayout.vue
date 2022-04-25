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
    class="bg-grey-4"
  >
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h6 text-center full-width"
          >EndlesS</q-toolbar-title
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
