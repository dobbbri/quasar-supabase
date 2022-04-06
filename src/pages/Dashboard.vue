<script setup>
import CardDashboard from 'src/components/CardDashbaord.vue'
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table="category"
          label="Categories"
          icon="shape-outline"
        />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6">
        <card-dashboard
          table="product"
          label="Products"
          icon="archive"
        />
      </div>
    </div>
  </q-page>
</template>
