<script setup>
// import { useQuasar } from 'quasar'
import { useMenuStore } from 'src/stores/menuStore'
// import { PageHeader } from 'src/components'
// import { useDefaults } from 'src/composables'

// const $q = useQuasar()
const store = useMenuStore()
// const { attr } = useDefaults()

const linksList = [
  { title: 'Início', caption: '', icon: 'home', routeName: 'index' },
  { title: 'Categoria', caption: '', icon: 'category', routeName: 'category-list' },
  { title: 'Produto', caption: '', icon: 'inventory', routeName: 'product-list' },
  { title: 'Configuracões', caption: '', icon: 'tune', routeName: 'config' }
]
</script>

<template>
  <q-drawer
    bordered
    v-model="store.isSidebarOpen"
    show-if-above
    :breakpoint="690"
  >
    <q-toolbar>
      <q-toolbar-title class="text-center"> Menu </q-toolbar-title>
    </q-toolbar>
    <!-- <page-header> -->
    <!--   <template #title>EndlesS</template> -->
    <!--   <template #buttons-right> -->
    <!--     <q-btn -->
    <!--       v-if="$q.platform.is.mobile" -->
    <!--       v-bind="attr.btn.icon" -->
    <!--       icon="close" -->
    <!--       @click="store.toggleSidebar()" -->
    <!--     /> -->
    <!--   </template> -->
    <!-- </page-header> -->

    <q-list>
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
