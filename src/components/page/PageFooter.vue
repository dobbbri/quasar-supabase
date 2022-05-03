<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>

<template>
  <div v-if="!$q.platform.is.mobile" class="row q-pb-xs q-pt-sm">
    <slot />
  </div>
  <q-footer v-if="$q.platform.is.mobile" class="bg-transparent row q-pa-md">
    <slot />
  </q-footer>
</template>
