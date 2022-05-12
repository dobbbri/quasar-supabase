<template>
  <div class="desktop-only row q-pb-xs q-pt-sm">
    <slot />
  </div>
  <q-footer class="mobile-only bg-transparent row q-pa-md">
    <slot />
  </q-footer>
</template>
