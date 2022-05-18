<script setup>
import { useDefaults } from "src/composables";
import { useMenuStore } from "src/stores/menuStore";

const { attr } = useDefaults();
const store = useMenuStore();
</script>

<template>
  <q-header class="bg-primary text-white" style="z-index: 1000">
    <q-toolbar class="justify-between">
      <div style="margin-left: -10px">
        <slot name="left">
          <q-btn
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
