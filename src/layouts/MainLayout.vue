<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthUser } from 'src/composables'
// import useApi from 'src/composables/UseApi'
import SidebarLinkList from 'src/components/SidebarLinkList.vue'
import DarkModeToggle from 'src/components/DarkModeToggle.vue'

const { logout } = useAuthUser()
// const { getBrand } = useApi()

const $q = useQuasar()
const router = useRouter()
const drawerOpen = ref(false)

const handleLogout = async () => {
  $q.dialog({
    title: 'Sair',
    message: 'Você realmente quer ir embora?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
    router.replace({ name: 'login' })
  })
}

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const linksList = [
  { title: 'Início', caption: '', icon: 'home', routeName: 'index' },
  { title: 'Categoria', caption: '', icon: 'category', routeName: 'category' },
  { title: 'Produto', caption: '', icon: 'inventory', routeName: 'product' },
  { title: 'Configuracões', caption: '', icon: 'tune', routeName: 'config' }
]

// onMounted(() => getBrand())
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />

        <q-toolbar-title class="text-weight-bold text-h6">EndlesS</q-toolbar-title>

        <dark-mode-toggle />

        <q-btn-dropdown
          flat
          color="white"
          icon="person"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="handleLogout"
            >
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          class="text-weight-bold text-h6 text-primary"
        >
          Menu
        </q-item-label>

        <sidebar-link-list
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        :key="$route.fullPath"
        v-slot="{ Component }"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
