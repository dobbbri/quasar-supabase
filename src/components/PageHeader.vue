<script setup>
import { useDefaults } from 'src/composables'
import { useMenuStore } from 'src/stores/menuStore'

const { attr } = useDefaults()
const store = useMenuStore()
</script>

<template>
  <q-header class="bg-transparent text-primary">
    <q-toolbar class="justify-between">
      <div>
        <slot name="left">
          <q-btn
            v-bind="attr.btn.icon"
            icon="menu"
            flat
            @click="store.toggleSidebar()"
          />
        </slot>
      </div>
      <q-toolbar-title class="absolute-center">
        <slot name="title" />
      </q-toolbar-title>
      <div>
        <slot name="right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
