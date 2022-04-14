import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    isSidebarOpen: false
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  }
})
