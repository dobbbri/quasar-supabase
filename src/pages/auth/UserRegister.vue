<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth, useTools, useDefaults } from "src/composables";

const router = useRouter();

const { loading, register } = useAuth();
const { notify } = useTools();
const { attr } = useDefaults();

const form = ref({
  email: "sergiodobri@gmail.com",
  password: "123456",
  privacy_policy: false,
  terms_of_use: false,
});

const handleSubmit = async () => {
  try {
    await register(form.value);
    notify.info(
      "Para finalizar o registro,",
      `um email de confirmação foi enviado para: ${form.value.email}.`
    );
    router.push({ name: "login" });
  } catch (error) {
    notify.error("Credenciais inválidas", error);
  }
};
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <q-form v-bind="attr.form" @submit.prevent="handleSubmit">
          <p class="text-h5 text-center">Criar sua conta</p>

          <!-- <q-input -->
          <!--   v-model="form.name" -->
          <!--   label="Nome" -->
          <!--   lazy-rules -->
          <!--   :rules="[(val) => val && val.length > 0]" -->
          <!--   error-message="O nome deve ser informado!" -->
          <!-- /> -->

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
            lazy-rules
            :rules="[(val) => val && val.length >= 6]"
            error-message="A senha deve ser possuir 6 ou mais caracteres"
          />

          <div>
            <div>
              <q-checkbox
                v-bind="attr.input.basic"
                v-model="form.privacy_policy"
                label="Concordo com a&nbsp;"
                color="primary"
                class="checkbox-fix"
              />
              <a href="" class="text-primary"> Politica de Privacidade </a>
            </div>

            <div>
              <q-checkbox
                v-bind="attr.input.basic"
                v-model="form.terms_of_use"
                label="Concordo com os&nbsp;"
                color="primary"
                class="checkbox-fix"
              />
              <a href="" class="text-primary"> Termos de Uso </a>
            </div>
          </div>

          <q-btn
            v-bind="attr.btn.basic"
            label="Criar conta"
            unelevated
            no-caps
            class="full-width q-mt-lg"
            :loading="loading"
            :disable="loading || !form.terms_of_use || !form.privacy_policy"
            type="submit"
          />

          <q-btn
            v-bind="attr.btn.basic"
            label="Já é usuário? Faça seu login"
            flat
            no-caps
            class="full-width q-mt-sm"
            :disable="loading"
            :to="{ name: 'login' }"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>
