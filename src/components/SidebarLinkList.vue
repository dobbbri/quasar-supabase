<script setup>
defineProps({
  title: { type: String, required: true },
  caption: { type: String, default: '' },
  routeName: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<template>
  <q-item
    clickable
    :to="{ name: routeName }"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="icon"
        color="primary"
        size="sm"
        class="q-mr-md"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
