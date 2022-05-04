<script setup>
// import { onMounted } from 'vue'
import { LeftSidebar } from 'src/components'
// import { useBrand } from 'src/composables'
// const { getBrand } = useBrand()
// onMounted(() =>  getBrand())
</script>

<template>
  <div
    class="WAL position-relative bg-grey-4"
    :style="'height: ' + $q.screen.height + 'px'"
  >
    <q-layout
      view="lHh Lpr lFf"
      class="WAL__layout shadow-3"
      container
    >
      <left-sidebar />

      <q-page-container class="bg-grey-2">
        <router-view
          :key="$route.fullPath"
          v-slot="{ Component }"
          style="overflow: hidden"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 5px
  padding-bottom: 5px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: $generic-border-radius
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
</style>
