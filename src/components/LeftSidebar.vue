<script setup>
import { useMenuStore } from 'src/stores/menuStore';
import { useUserStore } from 'src/stores/userStore';

const menuStore = useMenuStore();
const userStore = useUserStore();
</script>

<template>
  <q-drawer
    v-if="userStore.isLoggedIn"
    v-model="menuStore.isSidebarOpen"
    show-if-above
    :breakpoint="690"
    class="bg-grey-2"
  >
    <q-toolbar class="bg-blue-grey-4">
      <q-toolbar-title class="q-ml-xs text-white">Menu</q-toolbar-title>
    </q-toolbar>

    <q-list class="text-blue-grey-7">
      <q-item
        v-for="(link, index) in menuStore.menuList"
        :key="index"
        clickable
        :to="{ name: link.routeName }"
        exact
      >
        <q-item-section v-if="link.icon" avatar>
          <q-icon :name="link.icon" size="sm" class="q-mr-md" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            {{ link.title }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
