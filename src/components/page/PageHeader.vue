<script setup>
import { useDefaults } from 'src/composables';
import { useMenuStore } from 'src/stores/menuStore';
import { useUserStore } from 'src/stores/userStore';

const { attr } = useDefaults();
const menuStore = useMenuStore();
const userStore = useUserStore();
</script>

<template>
  <q-header class="bg-primary text-white" style="z-index: 1000">
    <q-toolbar class="justify-between">
      <div>
        <slot name="left">
          <q-btn
            v-if="userStore.isLoggedIn"
            v-bind="attr.btn.icon"
            icon="menu"
            flat
            @click="menuStore.toggleSidebar()"
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
