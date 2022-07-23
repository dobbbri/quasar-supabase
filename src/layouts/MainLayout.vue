<script setup>
import { LeftSidebar, PageFooter, TabMenu } from 'src/components';
</script>

<template>
  <div class="app position-relative" :style="'height: ' + $q.screen.height + 'px'">
    <q-layout view="lHh Lpr lFf" class="app-layout shadow-5" container>
      <left-sidebar />

      <page-footer>
        <tab-menu />
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
  background: #7d8395;
  /* background-image: url(../assets/hero-bg.svg); */
  /* background-position: top center; */
  /* background-repeat: no-repeat; */
  &-layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    max-width: 500px;
  }
}
</style>
