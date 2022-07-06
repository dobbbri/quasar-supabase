<script setup>
import { useDefaults } from 'src/composables';
import { useMenuStore } from 'src/stores/menuStore';

const { attr } = useDefaults();
const menuStore = useMenuStore();
</script>

<template>
  <div style="max-width: 260px">
    <q-drawer v-model="menuStore.isSidebarOpen" class="bg-blue-grey-1">
      <q-toolbar class="bg-blue-grey-10" style="height: 60px">
        <q-toolbar-title class="q-pl-xs text-white title"> Menu </q-toolbar-title>
        <div class="q-ml-auto">
          <q-btn v-bind="attr.btn.icon" icon="sym_o_close" flat @click="menuStore.toggleSidebar()">
            <q-tooltip>Fechar</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>

      <q-list class="text-blue-grey-8">
        <q-item
          v-for="(link, index) in menuStore.menuList"
          :key="index"
          clickable
          :to="{ name: link.routeName }"
          exact
          active-class="text-weight-bold bg-primary text-white"
        >
          <q-item-section v-if="link.icon" avatar>
            <q-icon :name="link.icon" size="md" />
          </q-item-section>

          <q-item-section class="title">
            <q-item-label> {{ link.title }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: $toolbar-title-font-size;
  font-weight: calc($toolbar-title-font-weight - 100);
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>
