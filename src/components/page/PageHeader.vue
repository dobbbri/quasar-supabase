<script setup>
import { useDefaults } from 'src/composables';
import { useMenuStore } from 'src/stores/menuStore';
import { useUserStore } from 'src/stores/userStore';

const { attr } = useDefaults();
const menuStore = useMenuStore();
const userStore = useUserStore();
</script>

<template>
  <q-header
    class="bg-primary text-white"
    style="z-index: 1000"
  >
    <q-toolbar>
      <div>
        <slot name="left">
          <q-btn
            v-if="userStore.isLoggedIn"
            v-bind="attr.btn.icon"
            icon="sym_r_menu"
            flat
            @click="menuStore.toggleSidebar()"
          >
            <q-tooltip>Menu</q-tooltip>
          </q-btn>
        </slot>
      </div>
      <div class="text-title q-ml-sm">
        <slot name="title" />
      </div>
      <div class="q-ml-auto">
        <slot name="right" />
      </div>
    </q-toolbar>
  </q-header>
</template>
