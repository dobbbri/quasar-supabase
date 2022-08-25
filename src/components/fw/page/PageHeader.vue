<script setup>
import { useDefaults, useAuth, useStore } from 'src/composables';

const { attr } = useDefaults();
const { toggleSidebar } = useStore();
const { isLoggedIn } = useAuth();
</script>

<template>
  <q-header v-cloak class="bg-app">
    <q-toolbar class="full-width toolbar-height">
      <div>
        <slot name="left">
          <q-btn
            v-if="isLoggedIn"
            v-bind="attr.btn.icon"
            icon="sym_o_menu"
            color="info"
            flat
            @click="toggleSidebar()"
          >
            <q-tooltip>Menu</q-tooltip>
          </q-btn>
        </slot>
      </div>
      <!-- <q-toolbar style="height: 60px"> -->
      <q-toolbar-title class="text-dark absolute-center">
        <slot name="title" />
      </q-toolbar-title>
      <!-- </q-toolbar> -->
      <div class="q-ml-auto">
        <slot name="right" />
      </div>
    </q-toolbar>
    <slot name="subheader" />
  </q-header>
</template>
