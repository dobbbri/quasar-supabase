<script setup>
import { LeftSidebar } from 'src/components';
</script>

<template>
  <div class="app position-relative" :style="'height: ' + $q.screen.height + 'px'">
    <q-layout view="lHh Lpr lFf" class="app-layout shadow-5" container>
      <left-sidebar />
      <q-page-container class="bg-white">
        <router-view :key="$route.fullPath" style="overflow: hidden" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  /* background: transparent; */
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
