<script setup>
import { useQuasar } from 'quasar'
import { useDefaults } from 'src/composables'
import { useMenuStore } from 'src/stores/menuStore'

const $q = useQuasar()
const { attr } = useDefaults()
const store = useMenuStore()
</script>

<template>
  <q-header class="bg-transparent text-primary">
    <q-toolbar class="justify-between">
      <div>
        <slot name="left">
          <q-btn
            v-if="$q.platform.is.mobile"
            v-bind="attr.btn.icon"
            icon="menu"
            flat
            @click="store.toggleSidebar()"
          >
            <q-tooltip>Menu</q-tooltip>
          </q-btn>
        </slot>
      </div>
      <q-toolbar-title>
        <slot name="title" />
      </q-toolbar-title>
      <div>
        <slot name="right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
