<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()
</script>

<template>
  <div
    v-if="!$q.platform.is.mobile"
    class="row q-pa-md"
  >
    <slot></slot>
  </div>
  <q-footer
    v-if="$q.platform.is.mobile"
    class="bg-transparent row q-pa-md"
  >
    <slot></slot>
  </q-footer>
</template>
