<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { PageHeader } from 'src/components';

const router = useRouter();
const route = useRoute();

const { loading, resetPassword } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const token = route.params.token;
const password = ref('');

const handleSubmit = async () => {
  try {
    await resetPassword(token, password.value);
    notify.success('Senha alterada.');
    router.push({ name: 'login' });
  } catch (error) {
    notify.error('Erro ao trocar a senha.', error);
  }
};
</script>

<template>
  <q-page padding>
    <page-header class="text-center">
      <template #title>Alterar a senha</template>
    </page-header>

    <div class="row justify-center">
      <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
        <p class="text-h5 text-center">Troca de senha</p>

        <q-input
          v-bind="attr.input.basic"
          v-model="password"
          label="Nova senha"
          lazy-rules
          :rules="[(val) => val && val.length >= 6]"
          error-message="A senha deve ser possuir 6 ou mais caracteres"
        />

        <q-btn
          v-bind="attr.btn.basic"
          label="Gravar"
          unelevated
          no-caps
          class="full-width q-mt-lg"
          :loading="loading"
          :disable="loading"
          type="submit"
        />

        <q-btn
          v-bind="attr.btn.basic"
          label="Cancelar"
          color="dark"
          flat
          no-caps
          class="full-width q-mt-sm"
          :disable="loading"
          :to="{ name: 'login' }"
        />
      </q-form>
    </div>
  </q-page>
</template>
