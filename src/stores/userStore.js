import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    profile: null
  }),
  getters: {
    isLoggedIn() {
      return !!this.user;
    }
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    }
  }
});
