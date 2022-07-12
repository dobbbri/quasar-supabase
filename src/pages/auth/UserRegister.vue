<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth, useTools, useDefaults } from 'src/composables';
import { Page, PageHeader, PageBody, BtnBack } from 'src/components';

const router = useRouter();

const { loading, register } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const isPwd = ref(true);

const form = ref({
  email: 'sergiodobri@gmail.com',
  password: '123456',
  privacy_policy: false,
  terms_of_use: false
});

const handleSubmit = async () => {
  try {
    await register(form.value);
    notify.info(
      'Para finalizar o registro,',
      `um email de confirmação foi enviado para: ${form.value.email}.`
    );
    router.push({ name: 'login' });
  } catch (error) {
    notify.error('Credenciais inválidas', error);
  }
};
</script>

<template>
  <div class="row justify-center q-mt-lg">
    <page>
      <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
        <page-header>
          <template #left>
            <btn-back :to="{ name: 'login' }" />
          </template>
          <template #title>
            <div class="absolute-center text-weight-bold">Criar Sua Conta</div>
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

          <div>
            <q-checkbox
              v-bind="attr.input.basic"
              v-model="form.privacy_policy"
              label="Concordo com a&nbsp;"
              color="primary"
            />
            <a href="" class="text-primary"> Politica de Privacidade </a>
          </div>

          <div>
            <q-checkbox
              v-bind="attr.input.basic"
              v-model="form.terms_of_use"
              label="Concordo com os&nbsp;"
              color="primary"
            />
            <a href="" class="text-primary"> Termos de Uso </a>
          </div>

          <q-btn
            v-bind="attr.btn.basic"
            label="Criar conta"
            color="primary"
            text-color="white"
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading || !form.terms_of_use || !form.privacy_policy"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Já é usuário? Faça seu login"
            text-color="info"
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
