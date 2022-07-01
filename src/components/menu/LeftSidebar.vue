<script setup>
import { useMenuStore } from 'src/stores/menuStore';
import { useUserStore } from 'src/stores/userStore';

const menuStore = useMenuStore();
const userStore = useUserStore();
</script>

<template>
  <div style="max-width: 260px">
    <q-drawer
      v-if="userStore.isLoggedIn"
      v-model="menuStore.isSidebarOpen"
      show-if-above
      :breakpoint="700"
      class="bg-blue-grey-1"
    >
      <q-toolbar class="bg-blue-grey-10" style="height: 60px">
        <q-toolbar-title class="q-ml-xs text-white"> Menu </q-toolbar-title>
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
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48;
}
</style>
