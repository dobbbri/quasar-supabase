<script setup>
import { useDefaults, useStore } from 'src/composables';

const { attr } = useDefaults();
const { state, toggleSidebar } = useStore();

const menuList = [
  { title: 'Configuracões', icon: 'sym_o_tune', routeName: 'settings-form' },
  { title: 'Sair', icon: 'sym_o_logout', routeName: 'user-logout' }
];
</script>

<template>
  <div>
    <q-drawer v-model="state.sidebarIsOpen" class="bg-blue-grey-1">
      <q-toolbar class="toolbar-height">
        <q-toolbar-title class="q-pl-md text-primary absolute-center title title-bar">
          Menu
        </q-toolbar-title>
        <div class="q-ml-auto">
          <q-btn
            v-bind="attr.btn.icon"
            icon="sym_o_close"
            color="primary"
            flat
            @click="toggleSidebar()"
          >
            <q-tooltip>Fechar</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>

      <q-list class="text-blue-grey-8">
        <q-item
          v-for="(link, index) in menuList"
          :key="index"
          clickable
          :to="{ name: link.routeName }"
          exact
          active-class="text-weight-bold bg-secondary text-white q-ma-xs rounded-borders"
        >
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" size="md" />
          </q-item-section>

          <q-item-section class="title title-sidebar">
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
}
</style>
