<script setup>
import { useDefaults } from 'src/composables'
import { MenuUser, PageHeader } from 'src/components'
import { useMenuStore } from 'src/stores/menuStore'

const { attr } = useDefaults()
const store = useMenuStore()
</script>

<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <q-btn
          v-bind="attr.btn.icon"
          icon="menu"
          flat
          @click="store.toggleSidebar()"
        />
      </template>
      <template #title>EndlesS</template>
      <template #buttons-right>
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
