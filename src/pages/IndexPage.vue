<script setup>
import { MenuUser, PageHeader } from 'src/components'
</script>

<template>
  <q-page padding>
    <page-header>
      <template #title>EndlesS</template>
      <template #right>
        <menu-user />
      </template>
    </page-header>
    <div class="row">
      <div class="q-mx-auto">
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-vertical.svg"
          style="width: 200px; height: 200px"
        />
      </div>
    </div>
  </q-page>
</template>
