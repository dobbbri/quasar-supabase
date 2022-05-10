<script setup>
import { useMenuStore } from 'src/stores/menuStore'

const store = useMenuStore()

const linksList = [
  { title: 'Início', caption: '', icon: 'home', routeName: 'index' },
  { title: 'Categorias', caption: '', icon: 'category', routeName: 'category-list' },
  { title: 'Produtos', caption: '', icon: 'inventory', routeName: 'product-list' },
  { title: 'Configuracões', caption: '', icon: 'tune', routeName: 'config' },
  { title: 'Unidade de Medida', caption: '', icon: 'scale', routeName: 'measure-unit-list' }
]
</script>

<template>
  <q-drawer
    v-model="store.isSidebarOpen"
    bordered
    show-if-above
    :breakpoint="690"
  >
    <q-toolbar>
      <q-toolbar-title class="q-ml-xs text-primary"> Menu </q-toolbar-title>
    </q-toolbar>

    <q-list class="text-grey-8">
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
            size="sm"
            class="q-mr-md"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            {{ link.title }}
          </q-item-label>
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
