<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/composables';
import { Page, PageHeader } from 'src/components';

const router = useRouter();
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log('logout error : ', error);
  } finally {
    router.replace({ name: 'login' });
  }
};

onMounted(async () => {
  await handleLogout();
});
</script>

<template>
  <page>
    <page-header>
      <template #title>
        <div class="text-center text-weight-bold">Saindo...</div>
      </template>
    </page-header>
  </page>
</template>
