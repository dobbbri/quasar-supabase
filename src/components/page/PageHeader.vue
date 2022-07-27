<script setup>
import { useDefaults, useAuth } from 'src/composables';
import { useMenuStore } from 'src/stores/menuStore';

const { attr } = useDefaults();
const menuStore = useMenuStore();
const { isLoggedIn } = useAuth();
</script>

<template>
  <q-header class="bg-primary text-white">
    <q-toolbar class="full-width toolbar-height">
      <div>
        <slot name="left">
          <q-btn
            v-if="isLoggedIn"
            v-bind="attr.btn.icon"
            icon="sym_o_menu"
            flat
            @click="menuStore.toggleSidebar()"
          >
            <q-tooltip>Menu</q-tooltip>
          </q-btn>
        </slot>
      </div>
      <!-- <q-toolbar style="height: 60px"> -->
      <q-toolbar-title class="text-white title title-bar">
        <slot name="title" />
      </q-toolbar-title>
      <!-- </q-toolbar> -->
      <div class="q-ml-auto">
        <slot name="right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
