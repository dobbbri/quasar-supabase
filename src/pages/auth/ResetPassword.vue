<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody } from 'src/components';

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
  <div class="row justify-center q-mt-lg">
    <page>
      <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
        <page-header>
          <template #title>
            <div class="text-center text-weight-bold">Alterar a Senha</div>
          </template>
        </page-header>

        <page-body>
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
            color="primary"
            text-color="white"
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
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'login' }"
          />
        </page-body>
      </q-form>
    </page>
  </div>
</template>
