<script setup>
import { useAuth } from 'src/composables';

const { isLoggedIn } = useAuth();
</script>

<template>
  <q-footer v-if="isLoggedIn" class="bg-primary row">
    <slot />
  </q-footer>
</template>
