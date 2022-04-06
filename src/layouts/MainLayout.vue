<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuth } from 'src/composables'
// import useApi from 'src/composables/UseApi'
import SidebarList from 'src/components/SidebarList.vue'
import DarkModeToggle from 'src/components/DarkModeToggle.vue'

const { user, logout } = useAuth()
// const { getBrand } = useApi()

const $q = useQuasar()
const router = useRouter()
const drawerOpen = ref(false)
const firstName = ref('')

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

onMounted(() => {
  firstName.value = user.value.user_metadata.name.split(' ')[0]
  // getBrand()
})
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
          :label="firstName"
          flat
          color="white"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="handleLogout"
            >
              <q-item-section>
                <q-item-label class="text-red text-body1">Sair</q-item-label>
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
      <sidebar-list />
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
