<script setup>
import { onMounted } from 'vue';
import { LeftSidebar, TabMenu } from 'src/components';
import { useAuth, useStore } from 'src/composables';

const { isLoggedIn } = useAuth();
const { clearFromState } = useStore();

const removeLoader = () => {
  const loading = document.querySelector('#loading');
  loading.classList.add('init_done');
  window.setTimeout(function () {
    loading.remove();
  }, 200);
};

onMounted(() => {
  clearFromState();
  removeLoader();
});
</script>

<template>
  <div v-cloak class="app position-relative" :style="'height: ' + $q.screen.height + 'px'">
    <q-layout view="lHh Lpr lFf" class="app-layout shadow-5" container>
      <left-sidebar />

      <page-footer v-if="isLoggedIn">
        <tab-menu class="text-grey-7 bg-grey-4" />
      </page-footer>

      <q-page-container class="bg-app">
        <router-view :key="$route.fullPath" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  background-image: url(../assets/hero-bg.svg);
  background-position: top center;
  background-repeat: no-repeat;
  &-layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    max-width: 500px;
  }
}
</style>
