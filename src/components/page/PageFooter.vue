<script setup>
import { useAuth } from 'src/composables';

const { isLoggedIn } = useAuth();
</script>

<template>
  <q-footer v-if="isLoggedIn" class="bg-grey-4 row">
    <slot />
  </q-footer>
</template>
