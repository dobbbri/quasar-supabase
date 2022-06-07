<script setup>
import { useDefaults } from 'src/composables';
import { useMenuStore } from 'src/stores/menuStore';

const { attr } = useDefaults();
const menuStore = useMenuStore();
</script>

<template>
  <q-header
    class="bg-primary text-white"
    style="z-index: 1000"
  >
    <q-toolbar>
      <div>
        <slot name="left">
          <div class="btn-menu">
            <q-btn
              v-bind="attr.btn.icon"
              icon="sym_r_menu"
              flat
              @click="menuStore.toggleSidebar()"
            >
              <q-tooltip>Menu</q-tooltip>
            </q-btn>
          </div>
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

<style
  lang="scss"
  scoped
>
.btn-menu {
  display: none;
}
@media (max-width: 700px) {
  .btn-menu {
    display: block;
  }
} ;
</style>
