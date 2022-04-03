<template>
  <q-page padding>
    <!-- <div class="row q-col-gutter-md"> -->
    <!-- <div class="col-md-4 col-xs-12 col-sm-6"> -->
    <!--   <card-dashboard -->
    <!--     table="category" -->
    <!--     label="Categories" -->
    <!--     icon="shape-outline" -->
    <!--   /> -->
    <!-- </div> -->
    <!-- <div class="col-md-4 col-xs-12 col-sm-6"> -->
    <!--   <card-dashboard -->
    <!--     table="product" -->
    <!--     label="Products" -->
    <!--     icon="archive" -->
    <!--   /> -->
    <!-- </div> -->
    <!-- </div> -->
    <div v-if="user">
      <div>Hello {{ user.user_metadata.name }}</div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthUser } from 'src/composables'
// import CardDashboard from 'src/components/CardDashbaord.vue'

const { user } = useAuthUser()
</script>
