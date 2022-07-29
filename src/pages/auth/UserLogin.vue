<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody } from 'src/components';

const router = useRouter();

const { loading, login, logout } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const isPwd = ref(true);

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456'
});

const handleSubmit = async () => {
  try {
    await login(form.value);
    router.push({ name: 'load-data' });
  } catch (error) {
    notify.error('Credenciais inválidas', error);
    throw error;
  }
};

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log('logout error : ', error);
  }
};

onMounted(async () => {
  await handleLogout();
});
</script>

<template>
  <div class="row justify-center q-mt-lg">
    <page>
      <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
        <page-header>
          <template #title>
            <div class="text-center text-weight-bold">Faça seu Login</div>
          </template>
        </page-header>

        <page-body>
          <q-input
            v-bind="attr.input.basic"
            v-model="form.email"
            label="Email"
            lazy-rules
            :rules="['email']"
            error-message="O email deve ser válido!"
            type="email"
          />

          <q-input
            v-bind="attr.input.basic"
            v-model="form.password"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            error-message="A senha deve ser informada!"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn
            v-bind="attr.btn.basic"
            label="Esqueceu sua senha?"
            class="float-right"
            text-color="info"
            flat
            :to="{ name: 'forgot-password' }"
            size="md"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Entrar"
            color="primary"
            text-color="white"
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Novo usuário? Crie uma conta"
            text-color="info"
            flat
            class="full-width q-mt-xs"
            :to="{ name: 'register' }"
          />
        </page-body>
      </q-form>
    </page>
  </div>
</template>
