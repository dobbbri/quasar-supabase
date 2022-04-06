<script setup>
const linksList = [
  { title: 'Início', caption: '', icon: 'home', routeName: 'index' },
  { title: 'Categoria', caption: '', icon: 'category', routeName: 'category' },
  { title: 'Produto', caption: '', icon: 'inventory', routeName: 'product' },
  { title: 'Configuracões', caption: '', icon: 'tune', routeName: 'config' }
]
</script>

<template>
  <q-list>
    <q-item-label
      header
      class="text-weight-bold text-h6 text-primary"
    >
      Menu
    </q-item-label>

    <q-item
      v-for="(link, index) in linksList"
      :key="index"
      clickable
      :to="{ name: link.routeName }"
      exact
    >
      <q-item-section
        v-if="link.icon"
        avatar
      >
        <q-icon
          :name="link.icon"
          color="primary"
          size="sm"
          class="q-mr-md"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-body1">{{ link.title }}</q-item-label>
        <q-item-label
          v-if="link.caption"
          caption
          >{{ link.caption }}</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>
</template>
