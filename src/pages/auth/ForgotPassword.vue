<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody } from 'src/components';

const router = useRouter();

const { loading, sendPasswordResetEmail } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const email = ref('');

const handleSubmit = async () => {
  try {
    await sendPasswordResetEmail(email.value);
    notify.info(
      'Para finalizar o registro,',
      `foi enviado um email de confirmação para: ${email.value}.`
    );
    router.push({ name: 'login' });
  } catch (error) {
    notify.error('Erro ao enviar email de troca de senha.', error);
  }
};
</script>

<template>
  <div class="row justify-center q-mt-lg">
    <page>
      <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
        <page-header class="text-center">
          <template #left></template>
          <template #title>
            <div class="absolute-center">Redefinir a senha</div>
          </template>
        </page-header>

        <page-body>
          <q-input
            v-bind="attr.input.basic"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[(val) => val && val.length > 0]"
            error-message="O email deve ser válido!"
            type="email"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Enviar email"
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
