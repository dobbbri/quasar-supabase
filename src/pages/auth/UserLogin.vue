<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { PageHeader } from 'src/components';

const router = useRouter();

const { loading, login } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456'
});

const handleSubmit = async () => {
  try {
    await login(form.value);
    router.push({ name: 'initial-routines' });
  } catch (error) {
    notify.error('Credenciais inválidas', error);
    throw error;
  }
};
</script>

<template>
  <q-page padding>
    <page-header class="text-center">
      <template #title>Entrar</template>
    </page-header>

    <div class="row justify-center">
      <q-form
        v-bind="attr.form"
        @submit.prevent="handleSubmit"
      >
        <q-input
          v-bind="attr.input.basic"
          v-model="form.email"
          label="Email"
          lazy-rules
          :rules="['email']"
          error-message="O email deve ser válido!"
          type="email"
        />

        <div class="row">
          <q-input
            v-bind="attr.input.basic"
            v-model="form.password"
            label="Senha"
            class="col-12"
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            error-message="A senha deve ser informada!"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Esqueceu sua senha?"
            class="q-ml-auto text-weight-menium"
            color="dark"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>

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
          color="dark"
          flat
          class="full-width q-mt-sm"
          :disable="loading"
          :to="{ name: 'register' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
