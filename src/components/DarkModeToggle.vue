<script setup>
import { ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const darkMode = ref(false)
const $q = useQuasar()

watch(darkMode, (darkMode) => {
  $q.dark.set(darkMode)
  $q.localStorage.set('darkMode', darkMode)
})

onMounted(() => {
  const darkModeIsActive = $q.localStorage.getItem('darkMode')
  if (darkModeIsActive) {
    darkMode.value = true
  }
})
</script>

<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="dark_mode"
    color="dark"
    unchecked-icon="light_mode"
    size="lg"
  />
</template>
