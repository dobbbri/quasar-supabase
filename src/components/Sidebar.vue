<script setup>
import { useMenuStore } from 'src/stores/menuStore'
const store = useMenuStore()

const linksList = [
  { title: 'Início', caption: '', icon: 'home', routeName: 'index' },
  { title: 'Categoria', caption: '', icon: 'category', routeName: 'category-list' },
  { title: 'Produto', caption: '', icon: 'inventory', routeName: 'product-list' },
  { title: 'Configuracões', caption: '', icon: 'tune', routeName: 'config' }
]
</script>

<template>
  <q-drawer
    v-model="store.isSidebarOpen"
    side="left"
    show-if-above
    :breakpoint="690"
    style="z-index: 50000"
  >
    <q-toolbar>
      <q-toolbar-title class="text-weight-bold text-h6 text-center full-width"
        >EndlesS</q-toolbar-title
      >
    </q-toolbar>

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
  </q-drawer>
</template>
